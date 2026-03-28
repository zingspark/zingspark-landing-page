#!/usr/bin/env node
/**
 * Validation script for copy-upgrade spec Task 3.1
 * Verifies:
 * 1. JSON.parse succeeds on both files
 * 2. Key path sets are complete (no added/removed keys)
 * 3. All functional copy values are preserved unchanged
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

let passed = 0;
let failed = 0;

function check(label, condition, detail) {
  if (condition) {
    console.log(`  ✅ PASS: ${label}`);
    passed++;
  } else {
    console.log(`  ❌ FAIL: ${label}${detail ? ' — ' + detail : ''}`);
    failed++;
  }
}

// ── 1. JSON Parse ──────────────────────────────────────────
console.log('\n=== 1. JSON Syntax Validation ===');

let en, zh;
try {
  en = JSON.parse(readFileSync(resolve(root, 'messages/en.json'), 'utf-8'));
  check('en.json parses successfully', true);
} catch (e) {
  check('en.json parses successfully', false, e.message);
}

try {
  zh = JSON.parse(readFileSync(resolve(root, 'messages/zh.json'), 'utf-8'));
  check('zh.json parses successfully', true);
} catch (e) {
  check('zh.json parses successfully', false, e.message);
}

if (!en || !zh) {
  console.log('\n⛔ Cannot continue — JSON parse failed.');
  process.exit(1);
}

// ── Helper: collect all key paths ──────────────────────────
function collectKeys(obj, prefix = '') {
  const keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      keys.push(...collectKeys(v, path));
    } else {
      keys.push(path);
    }
  }
  return keys.sort();
}

// ── 2. Key Path Completeness ───────────────────────────────
console.log('\n=== 2. Key Path Completeness ===');

const expectedKeys = [
  'Meta.title', 'Meta.description',
  'Header.about', 'Header.vision', 'Header.capabilities', 'Header.team', 'Header.jobs', 'Header.join',
  'Hero.line1', 'Hero.line2', 'Hero.description', 'Hero.cta', 'Hero.scrollDown',
  'Vision.tagline', 'Vision.subtitle', 'Vision.description',
  'Capabilities.title',
  'Capabilities.items.framework.title', 'Capabilities.items.framework.description',
  'Capabilities.items.hardware.title', 'Capabilities.items.hardware.description',
  'Capabilities.items.global.title', 'Capabilities.items.global.description',
  'Universities.title',
  'Jobs.title', 'Jobs.subtitle', 'Jobs.clickHint',
  'Recruitment.title', 'Recruitment.subtitle', 'Recruitment.note',
  'Recruitment.name', 'Recruitment.email', 'Recruitment.phone',
  'Recruitment.school', 'Recruitment.education',
  'Recruitment.educationOptions.bachelor', 'Recruitment.educationOptions.master',
  'Recruitment.educationOptions.phd', 'Recruitment.educationOptions.other',
  'Recruitment.interest', 'Recruitment.interestPlaceholder',
  'Recruitment.message', 'Recruitment.messagePlaceholder',
  'Recruitment.submit', 'Recruitment.sending', 'Recruitment.selectDegree',
  'Footer.company', 'Footer.offices', 'Footer.copyright', 'Footer.slogan',
  'Footer.email', 'Footer.icp', 'Footer.police',
  'Theme.light', 'Theme.dark', 'Theme.system',
  'Language.zh', 'Language.en',
].sort();

const enKeys = collectKeys(en);
const zhKeys = collectKeys(zh);

check('en.json key set matches expected',
  JSON.stringify(enKeys) === JSON.stringify(expectedKeys),
  enKeys.length !== expectedKeys.length
    ? `expected ${expectedKeys.length} keys, got ${enKeys.length}`
    : `diff: added=[${enKeys.filter(k => !expectedKeys.includes(k))}] removed=[${expectedKeys.filter(k => !enKeys.includes(k))}]`
);

check('zh.json key set matches expected',
  JSON.stringify(zhKeys) === JSON.stringify(expectedKeys),
  zhKeys.length !== expectedKeys.length
    ? `expected ${expectedKeys.length} keys, got ${zhKeys.length}`
    : `diff: added=[${zhKeys.filter(k => !expectedKeys.includes(k))}] removed=[${expectedKeys.filter(k => !zhKeys.includes(k))}]`
);


// ── 3. Functional Copy Preservation ────────────────────────
console.log('\n=== 3. Functional Copy Preservation ===');

// Helper to get nested value
function get(obj, path) {
  return path.split('.').reduce((o, k) => o?.[k], obj);
}

// EN functional copy expected values
const enFunctional = {
  'Header.about': 'About',
  'Header.vision': 'Vision',
  'Header.capabilities': 'Capabilities',
  'Header.team': 'Team',
  'Header.jobs': 'Positions',
  'Header.join': 'Join Us',
  'Theme.light': 'Light',
  'Theme.dark': 'Dark',
  'Theme.system': 'System',
  'Language.zh': '中文',
  'Language.en': 'English',
  'Hero.cta': 'Join Us',
  'Hero.scrollDown': 'Scroll to explore',
  'Jobs.clickHint': 'Click a role to apply',
  'Recruitment.note': 'Graduate & PhD candidates preferred',
  'Recruitment.name': 'Full Name',
  'Recruitment.email': 'Email',
  'Recruitment.phone': 'Phone',
  'Recruitment.school': 'University / Institution',
  'Recruitment.education': 'Degree',
  'Recruitment.educationOptions.bachelor': "Bachelor's",
  'Recruitment.educationOptions.master': "Master's",
  'Recruitment.educationOptions.phd': 'PhD',
  'Recruitment.educationOptions.other': 'Other',
  'Recruitment.interest': 'Area of Interest',
  'Recruitment.interestPlaceholder': 'e.g. NLP, Computer Vision, Robotics...',
  'Recruitment.message': 'Message (Optional)',
  'Recruitment.messagePlaceholder': 'Tell us about yourself...',
  'Recruitment.submit': 'Send Application',
  'Recruitment.sending': 'Opening mail client...',
  'Recruitment.selectDegree': 'Select degree',
  'Footer.company': 'Zingspark (Shanghai) Tech Co., Ltd.',
  'Footer.offices': 'Beijing · Shanghai · Shenzhen',
  'Footer.copyright': '© 2026 Zingspark. All rights reserved.',
  'Footer.email': 'hi@zingspark.tech',
  'Footer.icp': '沪ICP备2026010157号',
  'Footer.police': '沪公网安备xxxxxxxxxx号',
};

// ZH functional copy expected values
const zhFunctional = {
  'Header.about': '关于我们',
  'Header.vision': '愿景',
  'Header.capabilities': '能力',
  'Header.team': '团队',
  'Header.jobs': '岗位',
  'Header.join': '加入我们',
  'Theme.light': '浅色',
  'Theme.dark': '深色',
  'Theme.system': '系统',
  'Language.zh': '中文',
  'Language.en': 'English',
  'Hero.cta': '加入我们',
  'Hero.scrollDown': '向下滚动探索',
  'Jobs.clickHint': '点击岗位即可申请',
  'Recruitment.note': '硕士 / 博士优先',
  'Recruitment.name': '姓名',
  'Recruitment.email': '邮箱',
  'Recruitment.phone': '手机号',
  'Recruitment.school': '学校 / 机构',
  'Recruitment.education': '学历',
  'Recruitment.educationOptions.bachelor': '本科',
  'Recruitment.educationOptions.master': '硕士',
  'Recruitment.educationOptions.phd': '博士',
  'Recruitment.educationOptions.other': '其他',
  'Recruitment.interest': '感兴趣方向',
  'Recruitment.interestPlaceholder': '如：自然语言处理、计算机视觉、机器人...',
  'Recruitment.message': '留言（选填）',
  'Recruitment.messagePlaceholder': '简单介绍一下自己...',
  'Recruitment.submit': '发送申请',
  'Recruitment.sending': '正在打开邮件客户端...',
  'Recruitment.selectDegree': '请选择学历',
  'Footer.company': '星跃智启（上海）科技有限公司',
  'Footer.offices': '北京 · 上海 · 深圳',
  'Footer.copyright': '© 2026 星跃智启 版权所有',
  'Footer.email': 'hi@zingspark.tech',
  'Footer.icp': '沪ICP备2026010157号',
  'Footer.police': '沪公网安备xxxxxxxxxx号',
};

console.log('  --- EN functional copy ---');
for (const [path, expected] of Object.entries(enFunctional)) {
  const actual = get(en, path);
  check(`en ${path}`, actual === expected,
    actual !== expected ? `expected "${expected}", got "${actual}"` : undefined);
}

console.log('  --- ZH functional copy ---');
for (const [path, expected] of Object.entries(zhFunctional)) {
  const actual = get(zh, path);
  check(`zh ${path}`, actual === expected,
    actual !== expected ? `expected "${expected}", got "${actual}"` : undefined);
}

// ── Summary ────────────────────────────────────────────────
console.log('\n════════════════════════════════════════');
console.log(`  Total: ${passed + failed}  |  ✅ Passed: ${passed}  |  ❌ Failed: ${failed}`);
console.log('════════════════════════════════════════\n');

process.exit(failed > 0 ? 1 : 0);
