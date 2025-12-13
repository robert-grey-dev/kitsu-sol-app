# 🚀 ИНСТРУКЦИЯ ПО ДЕПЛОЮ САЙТА KITSU INU

## 📋 ОГЛАВЛЕНИЕ
1. [Подготовка к деплою](#подготовка)
2. [Деплой на Vercel (рекомендуется)](#vercel)
3. [Деплой на Netlify](#netlify)
4. [Деплой на собственный сервер](#vps)
5. [Настройка домена kitsuinu.com](#домен)
6. [Безопасность](#безопасность)

---

## 🎯 ПОДГОТОВКА

### 1. Проверка локально

```bash
cd website
npm install
npm run dev
```

Откройте http://localhost:3000 и убедитесь, что всё работает.

### 2. Получите API ключи Pinata

1. Зарегистрируйтесь на https://pinata.cloud (бесплатно)
2. Перейдите в "API Keys"
3. Создайте новый ключ с правами:
   - `pinFileToIPFS`
   - `pinJSONToIPFS`
4. Сохраните:
   - API Key
   - API Secret

### 3. Создайте .env

```bash
cp .env.example .env
```

Вставьте ваши ключи:
```env
PINATA_API_KEY=ваш_api_key
PINATA_SECRET_API_KEY=ваш_secret_key
```

---

## ☁️ VERCEL (Рекомендуется - самый простой)

### Почему Vercel?
- ✅ Бесплатно для некоммерческих проектов
- ✅ Автоматический CI/CD
- ✅ Глобальный CDN
- ✅ Автоматический HTTPS
- ✅ Создан специально для Next.js

### Шаги:

#### 1. Создайте репозиторий на GitHub

```bash
cd website
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kitsuinu-website.git
git push -u origin main
```

#### 2. Деплой на Vercel

1. Перейдите на https://vercel.com
2. Нажмите "Add New Project"
3. Подключите GitHub и выберите репозиторий
4. Vercel автоматически определит Next.js
5. Добавьте переменные окружения:
   - Нажмите "Environment Variables"
   - Добавьте:
     ```
     PINATA_API_KEY = ваш_api_key
     PINATA_SECRET_API_KEY = ваш_secret_key
     ```
6. Нажмите "Deploy"

#### 3. Готово! 🎉

Vercel даст вам URL вида: `https://kitsuinu-website.vercel.app`

---

## 🌐 NETLIFY

### Шаги:

#### 1. Создайте репозиторий (если еще нет)

```bash
git init
git add .
git commit -m "Initial commit"
git push
```

#### 2. Деплой на Netlify

1. Перейдите на https://netlify.com
2. Нажмите "Add new site" → "Import an existing project"
3. Подключите GitHub репозиторий
4. Настройте Build:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Добавьте переменные окружения:
   - "Site settings" → "Environment variables"
   - Добавьте `PINATA_API_KEY` и `PINATA_SECRET_API_KEY`
6. Нажмите "Deploy"

---

## 🖥️ СОБСТВЕННЫЙ VPS/СЕРВЕР

### Требования:
- Ubuntu 20.04+ или аналог
- Node.js 18+
- Nginx
- 1GB RAM минимум

### Шаги:

#### 1. Подключитесь к серверу

```bash
ssh root@your_server_ip
```

#### 2. Установите Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 3. Установите PM2

```bash
npm install -g pm2
```

#### 4. Клонируйте проект

```bash
cd /var/www
git clone https://github.com/YOUR_USERNAME/kitsuinu-website.git
cd kitsuinu-website/website
```

#### 5. Настройте окружение

```bash
nano .env
```

Вставьте:
```env
PINATA_API_KEY=ваш_ключ
PINATA_SECRET_API_KEY=ваш_секрет
```

#### 6. Соберите и запустите

```bash
npm install
npm run build
pm2 start npm --name "kitsuinu" -- start
pm2 save
pm2 startup
```

#### 7. Настройте Nginx

```bash
sudo nano /etc/nginx/sites-available/kitsuinu
```

Вставьте:
```nginx
server {
    listen 80;
    server_name kitsuinu.com www.kitsuinu.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Активируйте:
```bash
sudo ln -s /etc/nginx/sites-available/kitsuinu /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 8. Установите SSL (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d kitsuinu.com -d www.kitsuinu.com
```

---

## 🌍 НАСТРОЙКА ДОМЕНА kitsuinu.com

### Если используете Vercel:

1. В Vercel перейдите в "Settings" → "Domains"
2. Добавьте домен `kitsuinu.com`
3. У вашего регистратора домена добавьте DNS записи:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Если используете свой сервер:

У регистратора домена:
```
Type: A
Name: @
Value: ВАШ_IP_СЕРВЕРА

Type: A
Name: www
Value: ВАШ_IP_СЕРВЕРА
```

---

## 🔒 БЕЗОПАСНОСТЬ

### Обязательные шаги:

#### 1. Никогда не коммитьте .env

Убедитесь, что `.gitignore` содержит:
```
.env
.env.local
.env.production
```

#### 2. Используйте переменные окружения

На продакшене ВСЕ секретные ключи должны быть в env variables, а не в коде!

#### 3. Ограничьте Pinata API

В Pinata ограничьте домены:
- Settings → API Keys → Add Allowed Domain
- Добавьте только `kitsuinu.com`

#### 4. Настройте CORS

В `next.config.js` добавьте:
```javascript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: 'https://kitsuinu.com' },
      ],
    },
  ]
}
```

#### 5. Rate Limiting

Добавьте лимиты на API endpoints для защиты от DDoS.

#### 6. Мониторинг

Настройте мониторинг:
- Uptime: https://uptimerobot.com
- Errors: Vercel Analytics или Sentry
- Traffic: Google Analytics

---

## 🚦 ПЕРЕКЛЮЧЕНИЕ НА MAINNET

Когда готовы к продакшену:

1. Откройте `components/WalletProvider.tsx`
2. Измените:
```typescript
const network = WalletAdapterNetwork.Mainnet
```

3. Обновите RPC endpoint (опционально):
```typescript
const endpoint = useMemo(
  () => process.env.NEXT_PUBLIC_SOLANA_RPC || 'https://api.mainnet-beta.solana.com',
  []
)
```

4. Для production RPC используйте:
   - Helius: https://helius.dev (рекомендуется)
   - QuickNode: https://quicknode.com
   - Alchemy: https://alchemy.com

---

## ✅ ЧЕКЛИСТ ПЕРЕД ЗАПУСКОМ

### Технические:
- [ ] Локально всё работает
- [ ] .env не в Git
- [ ] API ключи Pinata настроены
- [ ] Сайт собирается без ошибок (`npm run build`)
- [ ] SSL сертификат установлен
- [ ] Домен подключен
- [ ] Переключено на mainnet

### Контент:
- [ ] Логотип добавлен
- [ ] Все ссылки на соцсети правильные
- [ ] Текста проверены на ошибки
- [ ] Meta tags для SEO настроены
- [ ] OG изображение добавлено

### Безопасность:
- [ ] CORS настроен
- [ ] Rate limiting добавлен
- [ ] Pinata домены ограничены
- [ ] Все env variables на сервере
- [ ] Мониторинг настроен

---

## 📊 ПОСЛЕ ДЕПЛОЯ

### 1. Проверьте функциональность

- ✅ Подключение кошелька работает
- ✅ Форма создания токена открывается
- ✅ Загрузка изображений работает
- ✅ Все ссылки кликабельны
- ✅ Мобильная версия выглядит нормально

### 2. SEO оптимизация

Добавьте сайт в:
- Google Search Console
- Bing Webmaster Tools
- Yandex Webmaster

### 3. Аналитика

Добавьте Google Analytics:
```typescript
// app/layout.tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

### 4. Продвижение

- Пост в Twitter
- Пост на Reddit r/solana
- Добавить в Solana Ecosystem
- Telegram анонс

---

## 🐛 РЕШЕНИЕ ПРОБЛЕМ

### Ошибка "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Ошибка деплоя на Vercel
Проверьте логи: Vercel Dashboard → Deployments → View Logs

### Сайт не открывается
1. Проверьте DNS: `nslookup kitsuinu.com`
2. Проверьте SSL: https://www.ssllabs.com/ssltest/
3. Проверьте сервер: `pm2 status`

### API не работает
1. Проверьте env variables
2. Проверьте Pinata ключи
3. Посмотрите логи: `pm2 logs kitsuinu`

---

## 📞 ПОДДЕРЖКА

Если что-то не работает:
1. Проверьте эту инструкцию
2. Посмотрите логи ошибок
3. Проверьте документацию Next.js
4. Спросите в Discord Solana

---

**Готово! Ваш сайт готов к запуску! 🚀**

**Kitsu Inu - Создаём будущее токенов на Solana! 🐱**


