import type { DiscoverProgram, DiscoverFormData } from './discoverPurpose.types';

export const DISCOVER_PROGRAMS: DiscoverProgram[] = [
  {
    id: 'foundation-class',
    number: '01',
    title: 'Foundation Class',
    subtitle: 'Build a Faith That Lasts',
    hookLine: 'Every journey with God begins with a strong foundation.',
    description:
      'Foundation Class will help you understand the essential truths of Scripture, discover God\u2019s purpose for your life, and build a faith that is rooted in truth and confident in conviction. You\u2019ll also learn how to clearly explain and confidently share what you believe with others.',
    closingLine:
      'A strong foundation doesn\u2019t just change what you know. It changes how you live.',
    ctaText: 'Build My Foundation',
    tag: 'Essential',
  },
  {
    id: 'equip-1',
    number: '02',
    title: 'Equip 1',
    subtitle: 'Learn to Disciple One Life at a Time',
    hookLine: 'Jesus calls every believer to make disciples.',
    description:
      'Equip 1 will teach you how to mentor someone in their walk with Christ using practical discipleship skills and our church\u2019s discipleship resources. Learn how to encourage spiritual growth, lead meaningful conversations, and invest in someone\u2019s life with confidence.',
    closingLine: 'One life faithfully discipled can impact generations.',
    ctaText: 'Learn to Disciple',
    tag: 'Discipleship',
  },
  {
    id: 'equip-2',
    number: '03',
    title: 'Equip 2',
    subtitle: 'Lead a Care Group. Change Lives Together.',
    hookLine: 'Following Jesus was never meant to be done alone.',
    description:
      'Equip 2 prepares you to lead a Care Group where people grow through God\u2019s Word, authentic relationships, and practical application of biblical truth. Learn how to facilitate discussions, care for people, and create an environment where lives are transformed.',
    closingLine:
      'Community is where faith grows and lives are changed.',
    ctaText: 'Lead a Care Group',
    tag: 'Leadership',
  },
  {
    id: 'equip-3',
    number: '04',
    title: 'Equip 3',
    subtitle: 'Raise Leaders. Multiply Your Impact.',
    hookLine:
      'Leadership is not just about leading people. It\u2019s about developing leaders.',
    description:
      'Equip 3 equips you to mentor future disciplers and Care Group leaders, helping them grow into confident, Christ-centered leaders. As you raise others, your impact extends far beyond what you could accomplish alone.',
    closingLine:
      'When you develop leaders, you multiply God\u2019s Kingdom.',
    ctaText: 'Raise Future Leaders',
    tag: 'Multiplication',
  },
  {
    id: 'school-of-ministry',
    number: '05',
    title: 'School of Ministry',
    subtitle: 'Discover Your Calling. Make an Impact.',
    hookLine:
      'God has a purpose for every believer, and fulfilling that purpose begins with knowing Him and His Word more deeply.',
    description:
      'Designed for anyone who wants to grow beyond Sunday messages, this course will help you gain a deeper understanding of the Bible, strengthen your faith, answer life\u2019s difficult questions with confidence, and discover how God\u2019s truth applies to everyday life. Whether you\u2019re called to full-time ministry or simply want to know God more deeply, you\u2019ll be better prepared to live out your faith and make a lasting impact wherever God has placed you.',
    closingLine:
      'A deeper knowledge of God\u2019s Word leads to a greater impact for His Kingdom.',
    ctaText: 'Answer the Call',
    tag: 'Ministry',
  },
];

export const INITIAL_DISCOVER_FORM_STATE: DiscoverFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  inspiration: '',
  hearAboutUs: '',
};
