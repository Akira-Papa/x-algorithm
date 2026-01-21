/**
 * Templates Data Index - 全テンプレートの登録と初期化
 */

import { registerTemplates } from '../store';
import { engagementTemplates } from './engagement';
import { viralTemplates } from './viral';
import { threadTemplates } from './thread';
import { questionTemplates } from './question';
import { valueTemplates } from './value';
import { storyTemplates } from './story';
import { newsTemplates } from './news';
import { opinionTemplates } from './opinion';
import { visualTemplates } from './visual';
import { videoTemplates } from './video';
import { ctaTemplates } from './cta';
import { communityTemplates } from './community';
import { timingTemplates } from './timing';
import { personalTemplates } from './personal';

// 全テンプレートを登録
const allTemplates = [
  ...engagementTemplates,
  ...viralTemplates,
  ...threadTemplates,
  ...questionTemplates,
  ...valueTemplates,
  ...storyTemplates,
  ...newsTemplates,
  ...opinionTemplates,
  ...visualTemplates,
  ...videoTemplates,
  ...ctaTemplates,
  ...communityTemplates,
  ...timingTemplates,
  ...personalTemplates,
];

registerTemplates(allTemplates);

// 個別エクスポート
export {
  engagementTemplates,
  viralTemplates,
  threadTemplates,
  questionTemplates,
  valueTemplates,
  storyTemplates,
  newsTemplates,
  opinionTemplates,
  visualTemplates,
  videoTemplates,
  ctaTemplates,
  communityTemplates,
  timingTemplates,
  personalTemplates,
};

// 全テンプレートのエクスポート
export { allTemplates };
