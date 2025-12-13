import {
  Connection,
  Keypair,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  setAuthority,
  AuthorityType,
} from '@solana/spl-token';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
} from '@metaplex-foundation/mpl-token-metadata';
import {
  keypairIdentity,
  publicKey,
  percentAmount,
} from '@metaplex-foundation/umi';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Конфигурация токена KITS
const TOKEN_CONFIG = {
  name: 'Kitsu Inu',
  symbol: 'KITS',
  decimals: 6,
  supply: 1000000000000, // 1 триллион
  metadataUri: 'ЗАМЕНИ_НА_URL_METADATA_JSON', // После загрузки metadata.json
};

async function createKitsuInuToken() {
  try {
    console.log('🚀 Создание токена Kitsu Inu (KITS)...\n');
    console.log('=' .repeat(70));

    // 1. Выбор сети
    const NETWORK = 'devnet'; // Измените на 'mainnet-beta' для реального выпуска
    
    const connection = new Connection(
      NETWORK === 'devnet'
        ? clusterApiUrl('devnet')
        : 'https://api.mainnet-beta.solana.com',
      'confirmed'
    );

    console.log(`📡 Сеть: ${NETWORK}`);

    // 2. Загрузка или создание кошелька
    let payer;
    const walletPath = path.join(__dirname, 'wallet.json');
    
    if (fs.existsSync(walletPath)) {
      console.log('💼 Загрузка кошелька...');
      const secretKey = JSON.parse(fs.readFileSync(walletPath, 'utf-8'));
      payer = Keypair.fromSecretKey(Uint8Array.from(secretKey));
    } else {
      console.log('💼 Создание нового кошелька...');
      payer = Keypair.generate();
      fs.writeFileSync(walletPath, JSON.stringify(Array.from(payer.secretKey)));
      console.log('⚠️  ВАЖНО: Кошелек сохранен в wallet.json - СОХРАНИТЕ РЕЗЕРВНУЮ КОПИЮ!');
    }

    console.log(`📍 Адрес: ${payer.publicKey.toBase58()}`);

    // 3. Проверка баланса
    const balance = await connection.getBalance(payer.publicKey);
    console.log(`💰 Баланс: ${(balance / LAMPORTS_PER_SOL).toFixed(4)} SOL`);

    if (balance === 0 && NETWORK === 'devnet') {
      console.log('💸 Запрос airdrop...');
      const airdropSignature = await connection.requestAirdrop(
        payer.publicKey,
        2 * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(airdropSignature);
      console.log('✅ Airdrop получен!');
    }

    if (balance < 0.1 * LAMPORTS_PER_SOL && NETWORK === 'mainnet-beta') {
      console.error('\n❌ Недостаточно SOL! Пополните кошелек минимум на 0.5 SOL');
      console.log(`📍 Адрес для пополнения: ${payer.publicKey.toBase58()}`);
      return;
    }

    console.log('=' .repeat(70));

    // 4. Создание mint (токена)
    console.log('\n🪙 Создание токена...');
    const mint = await createMint(
      connection,
      payer,
      payer.publicKey, // mint authority
      payer.publicKey, // freeze authority (можно null если не нужен)
      TOKEN_CONFIG.decimals
    );

    console.log(`✅ Токен создан!`);
    console.log(`📝 Mint адрес: ${mint.toBase58()}`);

    // 5. Создание Associated Token Account
    console.log('\n💼 Создание токен-аккаунта...');
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      payer.publicKey
    );

    console.log(`✅ Аккаунт создан: ${tokenAccount.address.toBase58()}`);

    // 6. Mint (выпуск) всего supply
    console.log(`\n🏭 Выпуск ${TOKEN_CONFIG.supply.toLocaleString('ru-RU')} токенов...`);
    const mintSignature = await mintTo(
      connection,
      payer,
      mint,
      tokenAccount.address,
      payer.publicKey,
      TOKEN_CONFIG.supply * Math.pow(10, TOKEN_CONFIG.decimals)
    );

    console.log(`✅ Токены выпущены!`);
    console.log(`📝 Транзакция: ${mintSignature}`);

    // 7. Создание метаданных (Metaplex)
    if (TOKEN_CONFIG.metadataUri !== 'ЗАМЕНИ_НА_URL_METADATA_JSON') {
      console.log('\n📝 Создание метаданных...');
      
      try {
        const umi = createUmi(connection.rpcEndpoint);
        const umiKeypair = umi.eddsa.createKeypairFromSecretKey(payer.secretKey);
        umi.use(keypairIdentity(umiKeypair));

        await createMetadataAccountV3(umi, {
          mint: publicKey(mint.toBase58()),
          mintAuthority: umiKeypair,
          payer: umiKeypair,
          updateAuthority: umiKeypair.publicKey,
          data: {
            name: TOKEN_CONFIG.name,
            symbol: TOKEN_CONFIG.symbol,
            uri: TOKEN_CONFIG.metadataUri,
            sellerFeeBasisPoints: percentAmount(0),
            creators: null,
            collection: null,
            uses: null,
          },
          isMutable: true,
          collectionDetails: null,
        }).sendAndConfirm(umi);

        console.log('✅ Метаданные добавлены!');
      } catch (error) {
        console.log(`⚠️  Не удалось создать метаданные: ${error.message}`);
        console.log('Можно добавить позже через metaboss');
      }
    } else {
      console.log('\n⚠️  Метаданные не добавлены (укажите metadataUri в TOKEN_CONFIG)');
      console.log('💡 Загрузите metadata.json на IPFS и запустите скрипт снова');
    }

    // 8. (Опционально) Отключение mint authority
    const REVOKE_MINT = false; // Установите true, чтобы supply стал фиксированным
    
    if (REVOKE_MINT) {
      console.log('\n🔒 Отключение mint authority...');
      await setAuthority(
        connection,
        payer,
        mint,
        payer.publicKey,
        AuthorityType.MintTokens,
        null
      );
      console.log('✅ Mint authority отключен - supply теперь фиксирован!');
    }

    // 9. Сохранение информации
    const tokenInfo = {
      name: TOKEN_CONFIG.name,
      symbol: TOKEN_CONFIG.symbol,
      mint: mint.toBase58(),
      decimals: TOKEN_CONFIG.decimals,
      supply: TOKEN_CONFIG.supply,
      owner: payer.publicKey.toBase58(),
      tokenAccount: tokenAccount.address.toBase58(),
      network: NETWORK,
      mintAuthorityRevoked: REVOKE_MINT,
      createdAt: new Date().toISOString(),
    };

    fs.writeFileSync('token-info.json', JSON.stringify(tokenInfo, null, 2));

    console.log('\n' + '=' .repeat(70));
    console.log('🎉 ТОКЕН KITSU INU УСПЕШНО СОЗДАН!');
    console.log('=' .repeat(70));
    console.log(`📛 Название: ${TOKEN_CONFIG.name}`);
    console.log(`🔤 Символ: ${TOKEN_CONFIG.symbol}`);
    console.log(`🪙 Mint: ${mint.toBase58()}`);
    console.log(`💼 Владелец: ${payer.publicKey.toBase58()}`);
    console.log(`📦 Supply: ${TOKEN_CONFIG.supply.toLocaleString('ru-RU')} ${TOKEN_CONFIG.symbol}`);
    console.log(`🔢 Decimals: ${TOKEN_CONFIG.decimals}`);
    console.log(`🌐 Сеть: ${NETWORK}`);
    console.log('=' .repeat(70));
    
    if (NETWORK === 'devnet') {
      console.log(`\n🔍 Проверить: https://explorer.solana.com/address/${mint.toBase58()}?cluster=devnet`);
    } else {
      console.log(`\n🔍 Solscan: https://solscan.io/token/${mint.toBase58()}`);
      console.log(`🔍 Explorer: https://explorer.solana.com/address/${mint.toBase58()}`);
    }

    console.log('\n💡 СЛЕДУЮЩИЕ ШАГИ:');
    console.log('=' .repeat(70));
    console.log('1. Создайте пул ликвидности на Raydium или Orca');
    console.log('2. Добавьте начальную ликвидность (например, 50% токенов + SOL)');
    console.log('3. Зафиксируйте LP токены (burn или lock)');
    console.log('4. Запустите маркетинг в соцсетях');
    console.log('5. Подайте заявку на листинг (CoinGecko, CoinMarketCap)');
    console.log('=' .repeat(70));

    console.log('\n📚 Как создать пул ликвидности:');
    console.log('');
    console.log('RAYDIUM:');
    console.log('1. Перейдите на https://raydium.io/liquidity/create/');
    console.log('2. Подключите кошелек (Phantom/Solflare)');
    console.log(`3. Выберите токен: ${mint.toBase58()}`);
    console.log('4. Создайте пару KITS/SOL');
    console.log('5. Добавьте ликвидность (рекомендуется 50% supply + SOL)');
    console.log('');
    console.log('ORCA:');
    console.log('1. Перейдите на https://www.orca.so/pools');
    console.log('2. Создайте новый пул KITS/SOL');
    console.log('3. Добавьте ликвидность');
    console.log('');
    console.log('💾 Информация сохранена в token-info.json\n');

  } catch (error) {
    console.error('\n❌ Ошибка:', error);
    console.log('\n💡 Возможные решения:');
    console.log('- Проверьте баланс SOL');
    console.log('- Проверьте подключение к сети');
    console.log('- Попробуйте другой RPC endpoint');
    process.exit(1);
  }
}

// Запуск
createKitsuInuToken();


