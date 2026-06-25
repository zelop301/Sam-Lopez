import React from 'react';
import { Testimonials } from './Testimonials';
import { FAQ } from './FAQ';

interface FAQReviewsTabProps {
  lang: 'en' | 'ja';
}

export const FAQReviewsTab: React.FC<FAQReviewsTabProps> = ({ lang }) => {
  return (
    <div className="space-y-16">
      {/* Brand Testimonials Carousel */}
      <Testimonials />

      {/* Frequently Asked Questions */}
      <FAQ lang={lang} />
    </div>
  );
};
