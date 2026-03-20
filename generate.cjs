const fs = require('fs');
const path = require('path');

// 1. Generate 1000+ Message Templates
const greetings = ['Hello', 'Hi', 'Hey', 'Greetings', 'Good day', 'Welcome', 'Hi there'];
const businessIntents = [
  'I would like to schedule a meeting to discuss [topic].',
  'We are following up on our previous conversation regarding [topic].',
  'We have an exciting new partnership opportunity.',
  'Could we arrange a quick call to discuss the [project] details?',
  'I am reaching out to propose a collaboration.',
  'Please find the attached proposal for [project].',
  'We are interested in your [product/service].',
  'Could you provide us with a quote for [service]?'
];
const customerIntents = [
  'Your order #[ORDER_ID] has been confirmed.',
  'Your payment of [AMOUNT] was successful.',
  'Your appointment is scheduled for [DATE] at [TIME].',
  'We have received your support ticket.',
  'Your delivery is on its way and will arrive by [DATE].',
  'Please review our recent service.',
  'Your account has been updated successfully.',
  'We noticed you left some items in your cart.'
];
const marketingIntents = [
  'Get [DISCOUNT]% off your next purchase!',
  'Our new [PRODUCT] is finally here.',
  'Don\'t miss out on our weekend sale.',
  'Join us for our upcoming event on [DATE].',
  'Exclusive early access to our new collection.',
  'Buy one get one free on selected items.',
  'Flash sale! 24 hours only.',
  'Unlock premium features with our new subscription plan.'
];
const personalIntents = [
  'Wishing you a very happy birthday!',
  'Congratulations on your incredible achievement!',
  'Thank you for your help recently.',
  'Let\'s catch up soon!',
  'Thinking of you and hoping you are well.',
  'Can\'t wait to see you at the party!',
  'Happy Anniversary!',
  'So proud of you for making this happen.'
];

const signOffs = [
  'Best regards, [Name]',
  'Thanks, [Name]',
  'Cheers!',
  'Looking forward to it.',
  'Have a great day!',
  'Sincerely, [Name]',
  'Let me know if you have questions.',
  'Talk soon.'
];

function generate(category, intents) {
  let results = [];
  let count = 1;
  for (let g of greetings) {
    for (let i of intents) {
      for (let s of signOffs) {
        results.push({
          title: category.charAt(0).toUpperCase() + category.slice(1) + ' Template ' + count,
          template: g + '! ' + i + ' ' + s,
          category: category
        });
        count++;
      }
    }
  }
  return results; // 7 * 8 * 8 = 448 per category = 1792 total!
}

const templates = {
  business: generate('business', businessIntents),
  customer: generate('customer', customerIntents),
  marketing: generate('marketing', marketingIntents),
  personal: generate('personal', personalIntents)
};

const templatesContent = 'export const MESSAGE_TEMPLATES = ' + JSON.stringify(templates, null, 2) + ';\n';
fs.writeFileSync(path.join(__dirname, 'src', 'lib', 'generated-templates.ts'), templatesContent);

// 2. Generate 200+ Auto Replies
const arGreetings = ['Hello!', 'Hi there.', 'Greetings from the team!', 'Thank you for reaching out.'];
const arStatuses = [
  "We are currently out of the office.",
  "You've reached us outside of normal business hours.",
  "We are away on holiday.",
  "Our team is currently handling high volumes of messages.",
  "We are in a team meeting right now.",
  "Today is a public holiday in our region.",
  "We are on a short break.",
  "Our support agents are currently offline."
];
const arPromises = [
  "We will get back to you within 24 hours.",
  "Someone from our team will respond when we return on [Date].",
  "We usually reply within a few hours.",
  "An agent will review your message shortly.",
  "We will respond as soon as we reopen.",
  "Your message is important to us, and we'll reply ASAP.",
  "Please expect a reply by tomorrow morning."
];

function genAR() {
  let results = [];
  let count = 1;
  const icons = ['Briefcase', 'Clock', 'Calendar', 'Send', 'MessageSquare', 'Sparkles'];
  for (let g of arGreetings) {
    for (let s of arStatuses) {
      for (let p of arPromises) {
        results.push({
          id: 'auto-reply-' + count,
          title: 'Auto Reply ' + count,
          iconName: icons[count % icons.length],
          content: g + ' ' + s + ' ' + p + ' If it is urgent, please email [Email/Phone].'
        });
        count++;
      }
    }
  }
  return results; // 4 * 8 * 7 = 224 total auto replies!
}

const autoReplies = genAR();
const arContent = "import { Briefcase, Clock, Calendar, Send, MessageSquare, Sparkles } from 'lucide-react';\n" +
"\n" +
"const iconMap: any = { Briefcase, Clock, Calendar, Send, MessageSquare, Sparkles };\n" +
"\n" +
"export const TEMPLATES = " + JSON.stringify(autoReplies, null, 2) + ".map(t => ({\n" +
"  ...t,\n" +
"  icon: iconMap[t.iconName as keyof typeof iconMap] || MessageSquare\n" +
"}));\n";

fs.writeFileSync(path.join(__dirname, 'src', 'lib', 'generated-auto-replies.ts'), arContent);

console.log('Successfully generated thousands of templates!');
