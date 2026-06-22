import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface FAQProps {
  lang?: 'en' | 'ja';
}

export const FAQ: React.FC<FAQProps> = ({ lang = 'en' }) => {
  const faqsEn: FAQItem[] = [
    {
      category: 'Partnership',
      question: 'How do we get in touch for sponsored content or campaign integrations?',
      answer: 'You can submit an inquiry directly through our "Brand Inquiry / Pitch Engine" form below or email us at zelop301@gmail.com. Our partnership manager will respond with our media deck, rate sheet, and custom package proposals within 24–48 hours.'
    },
    {
      category: 'Deliverables',
      question: 'What are your typical turnaround times for custom reviews & short-form creation?',
      answer: 'Standard turnaround time is 7 to 14 business days from the receipt of the sample product, depending on the complexity of the video shot plan (such as detailed acoustic sound-tests, macro-lighting cinematic b-rolls, or multi-angle desk setups). Expedited production tracks are available on request.'
    },
    {
      category: 'Shipping/Hardware',
      question: 'Do you accept physical sample shipments, and what is your return policy?',
      answer: 'Yes, we accept physical shipments of keyboards, microphones, peripherals, and high-end desk lifestyle items for hands-on review. Please note that sample shipments are treated as studio evaluation units and are not returned unless pre-paid return shipment labels are provided in advance.'
    },
    {
      category: 'Deliverables',
      question: 'Can we request raw video deliverables or whitelisting advertising permissions?',
      answer: 'Absolutely. We offer licensing packages for raw 4K b-roll footage, separate detailed sound recordings, and Spark Ad authorization codes for paid social media magnification (TikTok Custom Identity, Instagram Partnership ads).'
    },
    {
      category: 'Partnership',
      question: 'Which product categories align best with your community audience?',
      answer: 'Our community has extremely high engagement in custom mechanical keyboards, high-end audiophile sound components (WAVE XLR, XLR Microphones, Studio Monitore), custom ergonomic office rigs, visual lighting systems (Nanoleaf, Hue, ambient panels), and clean tech workspace layout aesthetics.'
    }
  ];

  const faqsJa: FAQItem[] = [
    {
      category: '提携パートナー',
      question: 'スポンサー提携やキャンペーンの相談方法は？',
      answer: '下記の「ブランドお問合せ ＆ 提案エンジン」フォームから、または直接 zelop301@gmail.com までご連絡ください。案件担当者が24〜48時間以内にメディアデック、価格表、カスタム提案プランとともにご返信いたします。'
    },
    {
      category: '納品形式',
      question: '商品レビューやショート動画作成の標準的な納期は？',
      answer: 'サンプル到着後、通常7〜14営業日程度です（打鍵音質テスト、シネマティックなマクロBロール、マルチアングル配置など、高度な演出が含まれるため）。お急ぎの方向けの特急プランもご相談いただけます。'
    },
    {
      category: '配送・実機検証',
      question: '物理サンプルの発送や、その返却に関してのポリシーは？',
      answer: 'キーボード、マイク、その他周辺機器、およびデスク環境用ライフスタイル製品のサンプル受け入れを常時受け付けております。なお、サンプル品は実機評価ユニットとしてお預かりするため、事前に着払い返送ラベルのご提供がない限りご返却は致しかねます。'
    },
    {
      category: '納品形式',
      question: '動画素材の生データ提供、広告のホワイトリスト（Spark Ads）利用は可能ですか？',
      answer: 'はい、可能です。生データの4K Bロールフッテージ利用権、個別の高音質打鍵音ファイル、および広告用コード（TikTokカスタムID、Instagramタイアップ広告）のライセンスパッケージをご用意しております。'
    },
    {
      category: '提携パートナー',
      question: '視聴者層と最も親和性が高い製品カテゴリは何ですか？',
      answer: '当コミュニティでは、カスタムメカニカルキーボード、高音質オーディオ機材（WAVE XLR、コンデンサーマイク）、エルゴノミクスデスクチェアやデスクランプ、Nanoleafなどの部屋全体をおしゃれにする間接照明において抜群のエンゲージメントを誇ります。'
    }
  ];

  const faqs = lang === 'ja' ? faqsJa : faqsEn;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    audioSystem.playClick();
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <motion.section
      id="sec-faq"
      className="mb-16 relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Soft dynamic ambient glowing dot */}
      <div className="absolute -bottom-10 left-12 w-[350px] h-[150px] bg-teal-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* FAQ Header */}
      <div className="mb-8">
        <span className="text-[10px] uppercase tracking-widest text-[#a3a3a3] font-mono block mb-1">
          {lang === 'ja' ? 'ナレッジベース ＆ ロジスティクス' : 'Knowledge Base & Logistics'}
        </span>
        <h2 className="text-2xl font-bold tracking-tight uppercase font-mono flex items-center gap-2">
          {lang === 'ja' ? 'よくあるご質問' : 'Frequently Asked Questions'}
        </h2>
        <p className="text-sm text-zinc-400">
          {lang === 'ja' 
            ? 'スポンサー候補企業様からよく寄せられる、高コンバージョンPR枠、製品サンプルの配送手順、著作権ライセンスに関するガイドです。' 
            : 'Everything you need to know about setting up high-conversion sponsorship integrations, shipping models, and media licensing.'}
        </p>
      </div>

      {/* Accordion List Container */}
      <div className="space-y-3 relative z-10">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="relative p-px rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5 transition-all duration-300"
            >
              <div 
                className={`bg-[#0b0b0b]/80 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'shadow-[0_0_20px_rgba(168,85,247,0.06)] border-white/10' : ''
                }`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  onMouseEnter={() => audioSystem.playHover()}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer focus:outline-none group active:scale-[0.99] transition-all"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    {/* Badge Category Tag */}
                    <span className="shrink-0 text-[8px] font-mono font-bold tracking-widest uppercase bg-white/5 border border-white/10 px-2 py-0.5 rounded text-purple-400">
                      {faq.category}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                      {faq.question}
                    </span>
                  </div>

                  {/* Icon */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`p-1.5 rounded-lg border bg-white/5 shrink-0 ${
                      isOpen ? 'border-purple-500/30 text-purple-400 bg-purple-500/10' : 'border-white/5 text-zinc-400 group-hover:text-zinc-200'
                    }`}
                  >
                    <ChevronDown size={14} />
                  </motion.div>
                </button>

                {/* Animated content expansion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-white/5 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed flex gap-3">
                        <div className="mt-1 p-1 bg-white/5 border border-white/5 rounded-lg h-fit text-purple-400 shrink-0">
                          <HelpCircle size={14} />
                        </div>
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};
