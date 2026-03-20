import fs from 'fs';
import path from 'path';

const templatesPath = path.join(process.cwd(), 'src', 'lib', 'generated-templates.ts');
const repliesPath = path.join(process.cwd(), 'src', 'lib', 'generated-auto-replies.ts');

function generateTemplates() {
  const parts = {
    business: {
      intro: ["Hello!", "Hi there,", "Greetings,", "Good day,", "Dear valued partner,", "Welcome,"],
      context: ["I'm writing to discuss our upcoming project.", "Just following up on the recent invoice.", "We have some quarter milestones to review.", "Let's align on the contract renewal.", "I wanted to sync about the B2B services we discussed.", "Reaching out regarding your recent business inquiry."],
      detail: ["We believe there is great synergy here.", "This is a critical step for our mutual success.", "I've attached the preliminary documents for your review.", "We are aiming to finalize everything by early next week.", "Our team has reviewed your proposals in depth.", "This could significantly improve our workflow efficiency."],
      closing: ["Please let me know your availability for a call.", "Looking forward to your swift feedback.", "Best regards,", "Let's connect soon to finalize this.", "Thanks in advance for your time.", "Appreciate your ongoing partnership."]
    },
    marketing: {
      intro: ["Hey VIP!", "Exciting news!", "Just for you,", "Don't miss out!", "Special announcement,", "Hi friend,"],
      context: ["We're thrilled to offer an exclusive 20% discount on your next order.", "Our newest collection has officially launched.", "You're invited to our upcoming marketing webinar.", "Our weekend flash sale is happening right now.", "We've upgraded your membership tier benefits.", "Check out our latest premium features."],
      detail: ["This offer is strictly limited to our top customers.", "We designed this with your specific needs in mind.", "Hundreds of customers are already taking advantage of this.", "This is our biggest drop of the year and it's selling fast.", "You automatically qualify for free shipping as well.", "We've added incredible new styles you'll absolutely love."],
      closing: ["Click the link below to claim it now!", "Shop now before supplies run out.", "Reply 'YES' to secure your spot.", "Visit our website for full details.", "Hurry, this won't last long!", "See you there!"]
    },
    support: {
      intro: ["Hi,", "Hello there,", "Dear customer,", "Greetings,", "Thanks for reaching out,", "Support Team here,"],
      context: ["I'm looking into your recent support ticket.", "We're aware of the technical issue you reported.", "Your account status has been updated.", "This is a notice about our upcoming maintenance schedule.", "I'd be happy to answer your billing question.", "Your refund request is currently being processed."],
      detail: ["Our engineering team is actively working on a fix.", "You should see the changes reflected in your account within 2-3 business days.", "We expect to have everything resolved shortly.", "We apologize for any inconvenience this may have caused.", "Everything looks fine on our end now, but please double check.", "This is a standard procedure to ensure your data security."],
      closing: ["Let us know if you need any further assistance.", "Thank you for your patience and understanding.", "Please reply directly to this thread if it persists.", "We're here to help anytime.", "Best, Support Team", "Have a great day."]
    },
    personal: {
      intro: ["Hey!", "Hi!", "Helloooo,", "Hey there,", "What's up!", "Hey friend,"],
      context: ["Let's definitely catch up this weekend.", "I was hoping we could grab coffee soon.", "I heard your recent news and wanted to say congratulations!", "Are you still coming to the family event?", "I'm finalizing our dinner plans for Tuesday.", "I was thinking about our trip next month."],
      detail: ["It's been way too long since we hung out properly.", "I know a great new place we can check out.", "I'm so incredibly happy for you.", "Let me know what you want to do so I can book it.", "Can't wait to hear all about everything.", "I'm free basically all day Saturday if that works."],
      closing: ["Talk to you soon!", "Let me know your schedule.", "Cheers!", "See you then!", "Can't wait!", "Miss you!"]
    },
    urgent: {
      intro: ["ATTENTION:", "URGENT:", "Important Notice:", "Immediate Action Required:", "Action Needed:", "System Alert:"],
      context: ["There is an urgent security update available for your account.", "Your pending payment needs to be resolved immediately.", "Your special offer is expiring in less than 24 hours.", "We detected a critical system warning.", "Important changes are coming to your account.", "Your subscription relies on an outdated card."],
      detail: ["If no action is taken, your access may be temporarily suspended.", "This is your final notice before the deadline.", "Please update your credentials immediately via the secure portal.", "We noticed unusual activity that requires your verification.", "To prevent service interruption, please respond immediately.", "This is a time-sensitive matter requiring your prompt attention."],
      closing: ["Please resolve this as soon as possible.", "Contact support immediately if you have concerns.", "Thank you for your prompt action.", "Act now to secure your account.", "Reply to this message for immediate help.", "Do not ignore this message."]
    },
    sales: {
      intro: ["Hi,", "Hello!", "Greetings,", "Dear lead,", "Hey there,", "Welcome,"],
      context: ["I wanted to follow up on our premium package.", "Here is the custom pricing quote you requested.", "I'd love to schedule a quick 10-minute demo with you.", "It's time to consider upgrading your current plan.", "We have a special bundle deal available this month.", "I want to learn more about your core business needs."],
      detail: ["Our tools have helped similar companies increase revenue by 30%.", "I've tailored this proposal specifically to your company's scale.", "It's completely risk-free and requires no technical setup on your end.", "This upgraded tier includes 24/7 dedicated support.", "We can drastically reduce your operational overhead.", "I'm confident we have the perfect solution for your team."],
      closing: ["Let's schedule a brief call tomorrow.", "Are you available for a quick chat next week?", "Looking forward to helping you grow.", "Let me know what time works best.", "Reply to book a demo instantly.", "Talk soon!"]
    }
  };

  const templates = {};
  Object.keys(parts).forEach(cat => { templates[cat] = []; });

  let count = 1;

  for (const cat of Object.keys(parts)) {
    const { intro, context, detail, closing } = parts[cat];
    let catCount = 0;
    
    // We want ~200 per category. 6 * 6 * 6 * 6 = 1296 combinations per category. 
    // We'll pick 200 distinct ones.
    let combinations = [];
    for (let i of intro) {
      for (let c of context) {
        for (let d of detail) {
          for (let cl of closing) {
            combinations.push(`${i} ${c} ${d} ${cl}`);
          }
        }
      }
    }
    
    // Shuffle the combinations array
    combinations = combinations.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 200 && i < combinations.length; i++) {
        templates[cat].push({
          title: `${cat.charAt(0).toUpperCase() + cat.slice(1)} Template ${i + 1}`,
          template: combinations[i],
          category: cat
        });
        count++;
    }
  }

  const fileContent = `export const MESSAGE_TEMPLATES = ${JSON.stringify(templates, null, 2)};`;
  fs.writeFileSync(templatesPath, fileContent, 'utf-8');
}

function generateAutoReplies() {
  const icons = ['Briefcase', 'Clock', 'Calendar', 'Send', 'MessageSquare', 'Sparkles', 'User', 'Mail', 'Inbox', 'Zap'];
  const intros = [
    "Thanks for your message.", "Hello there!", "We've received your inquiry.", "Hi!", "Greetings from our team.",
    "Thank you for contacting us.", "We appreciate your message.", "Welcome!", "Thanks for reaching out.", "Hello!"
  ];
  const conditions = [
    "We are currently out of the office on a holiday break.", "Our team is unusually busy right now handling a high volume of requests.",
    "You've reached us outside our standard business hours (9 AM - 5 PM).", "All our agents are currently assisting other customers on the floor.", 
    "We are currently closed for the weekend to recharge.", "I am currently away attending a conference.",
    "We are experiencing a temporary system upgrade.", "I am currently on annual leave.", "The office is closed for a public holiday.",
    "We are away at a company offsite."
  ];
  const expectations = [
    "We will get back to you within 24 hours without fail.", "Someone from our dedicated support team will reply shortly.", 
    "We will return your message first thing on Monday morning.", "Please expect a detailed reply by the next business day.", 
    "A senior representative will be with you as soon as they are free.", "We aim to respond to all queries within a few hours.",
    "If urgent, please call our emergency hotline.", "For immediate assistance, please visit our help center.",
    "We will prioritize your issue as soon as we return.", "Thank you in advance for your patience while we review this."
  ];
  const descriptions = [
    "Perfect for standard out of office scenarios.", "Professional response for busy periods.", "Ideal for weekend automated replies.",
    "Clear expectation setting for holiday closures.", "Friendly acknowledgement for general inquiries.", "Polite away message for corporate use.",
    "Great for managing high-volume incoming messages.", "Provides clear alternatives for urgent matters.", "Establishes firm boundaries for off-hours.",
    "Reassuring tone for customers waiting in queue."
  ];

  const replies = [];
  let idCounter = 1;

  let combinations = [];
  for (let i of intros) {
    for (let c of conditions) {
      for (let e of expectations) {
        for (let d of descriptions) {
          combinations.push({ intro: i, condition: c, expectation: e, description: d });
        }
      }
    }
  }

  // Shuffle
  combinations = combinations.sort(() => Math.random() - 0.5);

  for (let i = 0; i < 220 && i < combinations.length; i++) {
    const combo = combinations[i];
    replies.push({
      id: `auto-reply-${idCounter}`,
      title: `Auto Reply ${idCounter}`,
      iconName: icons[i % icons.length],
      description: combo.description,
      content: `${combo.intro} ${combo.condition} ${combo.expectation}`
    });
    idCounter++;
  }

  const fileContent = `export const TEMPLATES = ${JSON.stringify(replies, null, 2)};\n`;
  fs.writeFileSync(repliesPath, fileContent, 'utf-8');
}

generateTemplates();
generateAutoReplies();
console.log('Successfully generated highly unique templates and auto replies.');
