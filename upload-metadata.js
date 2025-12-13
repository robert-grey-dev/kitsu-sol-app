import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import FormData from 'form-data';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;
const IMAGE_FILE = 'ChatGPT Image 3 нояб. 2025 г., 19_53_20.png';

async function uploadToPinata(filePath, isJson = false) {
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
  
  const formData = new FormData();
  
  if (isJson) {
    const blob = new Blob([JSON.stringify(filePath)], { type: 'application/json' });
    formData.append('file', blob, 'metadata.json');
  } else {
    formData.append('file', fs.createReadStream(filePath));
  }

  const response = await axios.post(url, formData, {
    headers: {
      'pinata_api_key': PINATA_API_KEY,
      'pinata_secret_api_key': PINATA_SECRET_API_KEY,
      ...formData.getHeaders(),
    },
    maxBodyLength: Infinity,
  });

  if (!response.data || !response.data.IpfsHash) {
    throw new Error('Не удалось получить IPFS hash');
  }

  return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
}

async function uploadMetadata() {
  try {
    console.log('🚀 Загрузка метаданных Kitsu Inu на IPFS...\n');
    console.log('=' .repeat(60));

    // Проверка API ключей
    if (!PINATA_API_KEY || !PINATA_SECRET_API_KEY) {
      console.error('❌ API ключи Pinata не найдены!');
      console.log('\n📝 Создайте файл .env:');
      console.log('PINATA_API_KEY=ваш_api_key');
      console.log('PINATA_SECRET_API_KEY=ваш_secret_key');
      console.log('\n💡 Получите ключи на https://pinata.cloud (бесплатно)');
      return;
    }

    // 1. Проверка файла изображения
    const imagePath = path.join(__dirname, IMAGE_FILE);
    if (!fs.existsSync(imagePath)) {
      console.error(`❌ Изображение не найдено: ${IMAGE_FILE}`);
      console.log('💡 Поместите файл в папку проекта');
      return;
    }

    console.log(`📁 Найдено изображение: ${IMAGE_FILE}`);

    // 2. Загрузка изображения
    console.log('\n📤 Загрузка изображения на IPFS...');
    const imageUrl = await uploadToPinata(imagePath);
    console.log(`✅ Изображение загружено!`);
    console.log(`🔗 ${imageUrl}`);

    // 3. Обновление metadata.json
    const metadataPath = path.join(__dirname, 'metadata.json');
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
    
    metadata.image = imageUrl;
    metadata.properties.files[0].uri = imageUrl;

    // 4. Загрузка метаданных
    console.log('\n📤 Загрузка metadata.json на IPFS...');
    const metadataUrl = await uploadToPinata(metadata, true);
    console.log(`✅ Метаданные загружены!`);
    console.log(`🔗 ${metadataUrl}`);

    // 5. Сохранение обновленного metadata.json
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

    // 6. Сохранение ссылок
    const links = {
      imageUrl,
      metadataUrl,
      uploadedAt: new Date().toISOString(),
    };
    fs.writeFileSync('ipfs-links.json', JSON.stringify(links, null, 2));

    console.log('\n' + '=' .repeat(60));
    console.log('🎉 ВСЕ ЗАГРУЖЕНО НА IPFS!');
    console.log('=' .repeat(60));
    console.log(`🖼️  Изображение: ${imageUrl}`);
    console.log(`📝 Метаданные: ${metadataUrl}`);
    console.log('=' .repeat(60));

    console.log('\n💡 СЛЕДУЮЩИЙ ШАГ:');
    console.log('1. Откройте create-token.js');
    console.log('2. Найдите строку:');
    console.log('   metadataUri: "ЗАМЕНИ_НА_URL_METADATA_JSON"');
    console.log('3. Замените на:');
    console.log(`   metadataUri: "${metadataUrl}"`);
    console.log('4. Запустите: npm run create\n');

  } catch (error) {
    console.error('\n❌ Ошибка:', error.message);
    
    if (error.response) {
      console.log('Детали:', error.response.data);
    }
    
    console.log('\n💡 Альтернативные способы:');
    console.log('1. Проверьте API ключи Pinata');
    console.log('2. Используйте другой сервис:');
    console.log('   - https://nft.storage (бесплатно)');
    console.log('   - https://web3.storage (бесплатно)');
    console.log('3. Загрузите вручную и вставьте URL в create-token.js');
  }
}

uploadMetadata();


