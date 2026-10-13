/**
 * Toàn bộ chữ của landing, mỗi ngôn ngữ một object cùng kiểu `Content`.
 * Mô tả game lấy từ docs + manifest của phonics-game — đổi tính năng game thì sửa cả ở đây.
 * Không viết số liệu / đánh giá / lời khen chưa có thật (Google phạt review giả trong structured data).
 */
import type { ImageMetadata } from 'astro';
import breadCatcherCover from '@/assets/games/bread-catcher.png';
import foodStreamCover from '@/assets/games/food-stream.png';
import phonicsOceanCover from '@/assets/games/phonics-ocean.png';

export const LOCALES = ['vi', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

/** Mã ngôn ngữ cho `<html lang>`, `hreflang`, `og:locale`. */
export const LOCALE_META: Record<
  Locale,
  { htmlLang: string; ogLocale: string; path: string; label: string }
> = {
  vi: { htmlLang: 'vi', ogLocale: 'vi_VN', path: '/', label: 'Tiếng Việt' },
  en: { htmlLang: 'en', ogLocale: 'en_US', path: '/en/', label: 'English' },
};

export const BRAND = 'Phonics Arcade';
export const THEME_COLOR = '#7A3BB8';

type GameId = 'bread-catcher' | 'food-stream' | 'phonics-ocean';

/** Phần không đổi theo ngôn ngữ (id = hash route của game, ảnh bìa, màu nhấn). */
export const GAMES: readonly { id: GameId; name: string; cover: ImageMetadata; accent: string }[] = [
  { id: 'bread-catcher', name: 'Bread Catcher', cover: breadCatcherCover, accent: '#ffa62b' },
  { id: 'food-stream', name: 'Food Stream', cover: foodStreamCover, accent: '#ff6f9c' },
  { id: 'phonics-ocean', name: 'Phonics Ocean', cover: phonicsOceanCover, accent: '#20b8a6' },
];

interface GameCopy {
  tagline: string;
  description: string;
  skills: string[];
  modes: string;
  coverAlt: string;
  cta: string;
}

export interface Content {
  meta: { title: string; description: string; ogAlt: string };
  nav: {
    games: string;
    skills: string;
    classroom: string;
    faq: string;
    play: string;
    skip: string;
    menu: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primary: string;
    secondary: string;
    points: string[];
    imageAlt: string;
  };
  games: { title: string; lead: string; items: Record<GameId, GameCopy>; modesLabel: string };
  skills: { title: string; lead: string; items: { name: string; example: string; text: string }[] };
  features: { title: string; lead: string; items: { title: string; text: string; icon: string }[] };
  steps: { title: string; lead: string; items: { title: string; text: string }[] };
  faq: { title: string; items: { q: string; a: string }[] };
  cta: { title: string; text: string; button: string };
  footer: { tagline: string; language: string; rights: string };
  notFound: { title: string; text: string; home: string };
}

const vi: Content = {
  meta: {
    title: 'Phonics Arcade – Trò chơi Phonics cho bé mẫu giáo',
    description:
      'Bộ game phonics trên web cho bé 4–6 tuổi: luyện âm chữ cái, ghép từ CVC, vần, blend, digraph. Chơi cả lớp trên máy chiếu hoặc một mình trên điện thoại, chạy cả khi offline.',
    ogAlt: 'Phonics Arcade – ba trò chơi phonics Bread Catcher, Food Stream và Phonics Ocean',
  },
  nav: {
    games: 'Trò chơi',
    skills: 'Kỹ năng',
    classroom: 'Dùng trong lớp',
    faq: 'Hỏi đáp',
    play: 'Chơi ngay',
    skip: 'Bỏ qua tới nội dung chính',
    menu: 'Mở menu',
  },
  hero: {
    eyebrow: 'Game phonics cho bé 4–6 tuổi',
    title: 'Trò chơi Phonics giúp bé mẫu giáo vui học đọc tiếng Anh',
    lead: 'Phonics Arcade là bộ trò chơi phonics trên trình duyệt: bé nghe âm, chọn chữ, ghép từ và được thưởng kim cương sau mỗi câu đúng. Giáo viên chiếu lên màn hình lớn để cả lớp chia đội thi đua, phụ huynh mở trên điện thoại cho bé luyện tập ở nhà.',
    primary: 'Chơi ngay – không cần cài đặt',
    secondary: 'Xem 3 trò chơi',
    points: [
      'Chạy trên trình duyệt, cài được như app',
      'Chơi được khi mất mạng',
      'Máy chiếu, máy tính, tablet, điện thoại',
    ],
    imageAlt: 'Bé chọn đúng chiếc bánh mang chữ cái trong trò chơi Food Stream',
  },
  games: {
    title: '3 trò chơi phonics cho bé',
    lead: 'Mỗi trò chơi luyện một nhóm kỹ năng riêng, từ nhận biết âm đầu đến ghép từ trọn vẹn.',
    modesLabel: 'Chế độ chơi',
    items: {
      'bread-catcher': {
        tagline: 'Hứng bánh chữ theo đúng thứ tự để ghép thành từ',
        description:
          'Những chiếc bánh mang chữ cái rơi xuống, bé di chuyển rổ để hứng lần lượt từng chữ của từ mục tiêu. Có gói từ Blending, Early Blending, từ có tranh, ôn tập tổng hợp và gói “My Words” để giáo viên tự nhập từ của bài học.',
        skills: ['Ghép âm (blending)', 'Đánh vần'],
        modes: 'Cả lớp chia 3 đội với xúc xắc chọn lượt và bảng xếp hạng lớp · Chơi một mình',
        coverAlt: 'Màn hình trò chơi phonics Bread Catcher: rổ hứng những chiếc bánh mang chữ cái',
        cta: 'Chơi Bread Catcher',
      },
      'food-stream': {
        tagline: 'Livestream ăn uống: nghe âm rồi cho streamer ăn đúng món chữ',
        description:
          'Bé nghe âm hoặc từ, chọn món ăn mang chữ cái hay hình ảnh phù hợp và đút cho streamer. 7 cấp độ đi từ nghe âm chọn chữ, tìm chữ cái đầu, điền nguyên âm còn thiếu đến tự ghép cả từ chỉ bằng cách nghe.',
        skills: ['Âm chữ cái', 'Chữ cái đầu', 'Từ CVC'],
        modes: 'Lớp học 2 đội, có luật giành quyền trả lời và hẹn giờ · Chơi một mình với 1–3 sao',
        coverAlt:
          'Màn hình trò chơi Food Stream: hai bạn nhỏ livestream ăn bánh donut chữ D và bánh cupcake chữ B',
        cta: 'Chơi Food Stream',
      },
      'phonics-ocean': {
        tagline: 'Bơi, lắng nghe và ăn đúng chú cá mang từ để lớn thật nhanh',
        description:
          'Phong cách Feeding Frenzy: bé điều khiển chú cá ăn đúng cá mang chữ theo âm, vần hoặc từ vừa nghe để lớn dần và né cá săn mồi. 8 cấp độ đi qua âm đầu, từ CVC, vần, blend, digraph, Magic E và ôn tập.',
        skills: ['Âm đầu', 'CVC', 'Vần', 'Blend', 'Digraph', 'Magic E'],
        modes: 'Chơi một mình, có chế độ luyện tập không có cá săn mồi',
        coverAlt: 'Màn hình trò chơi Phonics Ocean: chú cá nhỏ bơi giữa rạn san hô ăn cá mang chữ',
        cta: 'Chơi Phonics Ocean',
      },
    },
  },
  skills: {
    title: 'Bé luyện được những kỹ năng phonics nào?',
    lead: 'Lộ trình đi từ âm đơn lẻ đến từ hoàn chỉnh, đúng thứ tự giáo viên mầm non thường dạy.',
    items: [
      { name: 'Âm chữ cái', example: '/m/ /s/ /t/', text: 'Nghe và nhận ra âm của từng chữ cái.' },
      { name: 'Âm đầu', example: 'm → moon', text: 'Tìm từ bắt đầu bằng âm vừa nghe.' },
      {
        name: 'Ghép âm & từ CVC',
        example: 'c-a-t → cat',
        text: 'Ghép phụ âm – nguyên âm – phụ âm thành từ.',
      },
      { name: 'Vần', example: 'cat · hat · bat', text: 'Nhận ra các từ có cùng vần.' },
      { name: 'Blend', example: 'bl · st · nd', text: 'Đọc hai phụ âm đứng liền nhau.' },
      { name: 'Digraph', example: 'sh · ch · th', text: 'Hai chữ cái tạo thành một âm mới.' },
      { name: 'Magic E', example: 'cap → cape', text: 'Chữ e câm làm nguyên âm đọc dài.' },
      { name: 'Đánh vần', example: 'd _ g', text: 'Điền chữ còn thiếu và tự ghép cả từ.' },
    ],
  },
  features: {
    title: 'Vì sao giáo viên và phụ huynh chọn Phonics Arcade?',
    lead: 'Thiết kế cho lớp mẫu giáo thật: màn hình lớn, nhiều bé cùng chơi, ít thao tác cho người lớn.',
    items: [
      {
        icon: '👩‍🏫',
        title: 'Cả lớp cùng chơi trên máy chiếu',
        text: 'Chế độ lớp học chia đội, tự xếp lượt và tính điểm; giao diện ngang vừa khít màn hình lớn.',
      },
      {
        icon: '📱',
        title: 'Bé tự luyện trên điện thoại',
        text: 'Giao diện dọc cho điện thoại, chế độ một mình có sao và cấp độ để bé chơi tiếp ở nhà.',
      },
      {
        icon: '🔊',
        title: 'Máy đọc âm và từ',
        text: 'Âm và từ được đọc thành tiếng để bé nghe rồi chọn, không cần biết đọc chữ hướng dẫn.',
      },
      {
        icon: '📶',
        title: 'Chơi được khi mất mạng',
        text: 'Cài lên màn hình chính như một ứng dụng; đã mở một lần là chơi tiếp được khi không có Internet.',
      },
      {
        icon: '💎',
        title: 'Kim cương tạo động lực',
        text: 'Mỗi câu đúng được một viên kim cương, dùng để mở khoá trò chơi mới — không có quảng cáo.',
      },
      {
        icon: '📖',
        title: 'Hướng dẫn tiếng Việt cho người lớn',
        text: 'Nút GUIDE trong từng trò chơi giải thích cách chơi và từng tuỳ chọn bằng tiếng Việt.',
      },
    ],
  },
  steps: {
    title: 'Dùng Phonics Arcade trong tiết học như thế nào?',
    lead: 'Ba bước, không cần tạo tài khoản.',
    items: [
      {
        title: 'Mở trên màn hình lớn',
        text: 'Mở Phonics Arcade bằng trình duyệt trên máy tính nối máy chiếu hoặc TV của lớp.',
      },
      {
        title: 'Chọn trò chơi và chế độ lớp học',
        text: 'Chọn gói từ và cấp độ khớp với bài hôm nay, đặt tên đội cho các bé.',
      },
      {
        title: 'Các đội thay phiên chơi',
        text: 'Từng đội lên chơi theo lượt; cuối buổi xem bảng xếp hạng và trao phần thưởng cho đội thắng.',
      },
    ],
  },
  faq: {
    title: 'Câu hỏi thường gặp',
    items: [
      {
        q: 'Phonics là gì và vì sao bé mẫu giáo nên học?',
        a: 'Phonics là phương pháp dạy đọc tiếng Anh dựa trên mối liên hệ giữa chữ cái và âm. Khi nắm được âm của từng chữ, bé có thể tự ghép âm để đọc những từ chưa gặp bao giờ thay vì phải học thuộc lòng từng từ.',
      },
      {
        q: 'Phonics Arcade phù hợp với bé mấy tuổi?',
        a: 'Trò chơi được thiết kế cho bé mẫu giáo khoảng 4–6 tuổi: chữ to, ít chữ trên màn hình, nút bấm lớn, âm và từ được đọc thành tiếng.',
      },
      {
        q: 'Có cần cài đặt ứng dụng hay tạo tài khoản không?',
        a: 'Không. Phonics Arcade chạy ngay trên trình duyệt của máy tính, tablet hoặc điện thoại và không cần tài khoản để chơi. Nếu muốn, bạn có thể thêm vào màn hình chính để mở như một ứng dụng.',
      },
      {
        q: 'Có chơi được khi không có Internet không?',
        a: 'Có. Sau lần mở đầu tiên khi có mạng, trò chơi được lưu lại trên thiết bị nên vẫn chơi được trong lớp học không có Wi-Fi.',
      },
      {
        q: 'Giáo viên có thể dùng từ vựng của bài học riêng không?',
        a: 'Có. Trong Bread Catcher, gói “My Words” cho phép giáo viên tự nhập danh sách từ cần luyện; các trò chơi khác có nhiều gói từ và cấp độ để chọn theo tiến độ của lớp.',
      },
      {
        q: 'Giao diện trò chơi bằng tiếng Anh hay tiếng Việt?',
        a: 'Giao diện cho bé hoàn toàn bằng tiếng Anh với chữ ngắn, dễ hiểu để bé đắm mình trong ngôn ngữ; phần hướng dẫn dành cho giáo viên và phụ huynh viết bằng tiếng Việt.',
      },
    ],
  },
  cta: {
    title: 'Sẵn sàng cho tiết phonics vui nhất?',
    text: 'Mở trình duyệt và chơi ngay — trên máy chiếu của lớp hay điện thoại ở nhà.',
    button: 'Bắt đầu chơi',
  },
  footer: {
    tagline: 'Trò chơi phonics cho bé mẫu giáo – học đọc tiếng Anh qua âm chữ cái.',
    language: 'Ngôn ngữ',
    rights: 'Bảo lưu mọi quyền.',
  },
  notFound: {
    title: 'Không tìm thấy trang',
    text: 'Trang bạn tìm không tồn tại hoặc đã được chuyển đi.',
    home: 'Về trang chủ',
  },
};

const en: Content = {
  meta: {
    title: 'Phonics Arcade – Phonics Games for Kindergarten Kids',
    description:
      'Browser-based phonics games for ages 4–6: letter sounds, CVC blending, rhymes, blends and digraphs. Play as a whole class on a projector or solo on a phone — even offline.',
    ogAlt: 'Phonics Arcade – three phonics games: Bread Catcher, Food Stream and Phonics Ocean',
  },
  nav: {
    games: 'Games',
    skills: 'Skills',
    classroom: 'In class',
    faq: 'FAQ',
    play: 'Play now',
    skip: 'Skip to main content',
    menu: 'Open menu',
  },
  hero: {
    eyebrow: 'Phonics games for ages 4–6',
    title: 'Phonics games that make kindergarten reading fun',
    lead: 'Phonics Arcade is a set of browser phonics games: kids listen to a sound, pick the letter, build the word and earn a gem for every right answer. Teachers put it on the big screen for team play; parents open it on a phone for practice at home.',
    primary: 'Play now – nothing to install',
    secondary: 'See the 3 games',
    points: [
      'Runs in the browser, installs like an app',
      'Works offline',
      'Projector, desktop, tablet and phone',
    ],
    imageAlt: 'A child feeds the right letter treat to the streamer in Food Stream',
  },
  games: {
    title: '3 phonics games for young learners',
    lead: 'Each game trains its own set of skills, from first sounds to building whole words.',
    modesLabel: 'Modes',
    items: {
      'bread-catcher': {
        tagline: 'Catch the letter breads in order to build each word',
        description:
          'Letter breads fall from the sky and kids move the basket to catch each letter of the target word in order. Includes Blending, Early Blending, Picture Vocabulary and Mixed Review packs, plus “My Words” so teachers can type in their own lesson words.',
        skills: ['Blending', 'Spelling'],
        modes: 'Class mode with 3 teams, magic dice turns and a class leaderboard · Solo',
        coverAlt: 'Bread Catcher phonics game: a basket catching breads with letters on them',
        cta: 'Play Bread Catcher',
      },
      'food-stream': {
        tagline: 'Go live! Listen, then feed the streamer the right letter food',
        description:
          'Kids hear a sound or word, choose the letter or picture food that matches and feed it to the streamer. Seven levels go from hear-and-tap, first letters and missing vowels to building a whole word just by listening.',
        skills: ['Letter sounds', 'First letter', 'CVC words'],
        modes: 'Classroom with 2 teams, steal rule and answer timer · Solo with 1–3 stars',
        coverAlt: 'Food Stream game: two kids live-streaming with a letter D donut and a letter B cupcake',
        cta: 'Play Food Stream',
      },
      'phonics-ocean': {
        tagline: 'Swim, listen and eat the right word-fish to grow big',
        description:
          'A Feeding Frenzy-style game: kids steer a fish to eat the word-fish that matches the sound, rhyme or word they heard, growing bigger while dodging predators. Eight levels cover first sounds, CVC, rhymes, blends, digraphs, Magic E and review.',
        skills: ['First sounds', 'CVC', 'Rhyme', 'Blends', 'Digraphs', 'Magic E'],
        modes: 'Solo, with a practice mode that has no predators',
        coverAlt: 'Phonics Ocean game: a small fish swimming over a coral reef among word-fish',
        cta: 'Play Phonics Ocean',
      },
    },
  },
  skills: {
    title: 'Which phonics skills do kids practise?',
    lead: 'A path from single sounds to whole words, in the order kindergarten teachers usually teach.',
    items: [
      { name: 'Letter sounds', example: '/m/ /s/ /t/', text: 'Hear and recognise the sound of each letter.' },
      { name: 'First sounds', example: 'm → moon', text: 'Find words that start with the sound they hear.' },
      {
        name: 'Blending & CVC',
        example: 'c-a-t → cat',
        text: 'Blend consonant–vowel–consonant into a word.',
      },
      { name: 'Rhyme', example: 'cat · hat · bat', text: 'Spot words that share the same ending.' },
      { name: 'Blends', example: 'bl · st · nd', text: 'Read two consonants side by side.' },
      { name: 'Digraphs', example: 'sh · ch · th', text: 'Two letters that make one new sound.' },
      { name: 'Magic E', example: 'cap → cape', text: 'A silent e makes the vowel say its name.' },
      { name: 'Spelling', example: 'd _ g', text: 'Fill in missing letters and build whole words.' },
    ],
  },
  features: {
    title: 'Why teachers and parents choose Phonics Arcade',
    lead: 'Built for real kindergarten classrooms: big screens, many kids at once, few clicks for adults.',
    items: [
      {
        icon: '👩‍🏫',
        title: 'Whole-class play on a projector',
        text: 'Classroom modes split kids into teams, take turns and keep score; the landscape layout fills a big screen.',
      },
      {
        icon: '📱',
        title: 'Solo practice on a phone',
        text: 'A portrait layout for phones, with stars and levels so kids can keep going at home.',
      },
      {
        icon: '🔊',
        title: 'Sounds and words read aloud',
        text: 'Sounds and words are spoken aloud, so kids listen and choose without reading instructions.',
      },
      {
        icon: '📶',
        title: 'Works without Internet',
        text: 'Add it to the home screen like an app; once opened, it keeps working offline.',
      },
      {
        icon: '💎',
        title: 'Gems keep kids motivated',
        text: 'Every right answer earns a gem that unlocks new games — and there are no ads.',
      },
      {
        icon: '📖',
        title: 'Guides for grown-ups',
        text: 'A GUIDE button in each game explains how to play and every setup option (in Vietnamese).',
      },
    ],
  },
  steps: {
    title: 'How to use Phonics Arcade in a lesson',
    lead: 'Three steps, no sign-up needed.',
    items: [
      {
        title: 'Open it on the big screen',
        text: 'Open Phonics Arcade in the browser of the classroom computer, projector or TV.',
      },
      {
        title: 'Pick a game and classroom mode',
        text: 'Choose the word pack and level that match today’s lesson and name the teams.',
      },
      {
        title: 'Teams take turns',
        text: 'Each team plays its turn; finish with the leaderboard and a reward for the winners.',
      },
    ],
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        q: 'What is phonics and why does it matter in kindergarten?',
        a: 'Phonics teaches reading through the link between letters and sounds. Once kids know the sound of each letter, they can blend sounds to read words they have never seen instead of memorising every word.',
      },
      {
        q: 'What age is Phonics Arcade for?',
        a: 'It is designed for kindergarten kids around 4–6 years old: large letters, little text on screen, big buttons, with sounds and words read aloud.',
      },
      {
        q: 'Do I need to install an app or create an account?',
        a: 'No. Phonics Arcade runs in the browser on a computer, tablet or phone and needs no account to play. You can add it to your home screen to open it like an app.',
      },
      {
        q: 'Can it be played offline?',
        a: 'Yes. After the first visit with a connection, the games are stored on the device, so they keep working in classrooms without Wi-Fi.',
      },
      {
        q: 'Can teachers use their own lesson vocabulary?',
        a: 'Yes. In Bread Catcher, the “My Words” pack lets teachers type in their own word list; the other games offer several word packs and levels to match the class’s progress.',
      },
      {
        q: 'Is the game interface in English?',
        a: 'Yes — everything kids see is in short, simple English for immersion. The guides for teachers and parents are written in Vietnamese.',
      },
    ],
  },
  cta: {
    title: 'Ready for the most fun phonics lesson?',
    text: 'Open your browser and start playing — on the classroom projector or a phone at home.',
    button: 'Start playing',
  },
  footer: {
    tagline: 'Phonics games for kindergarten — learning to read English through letter sounds.',
    language: 'Language',
    rights: 'All rights reserved.',
  },
  notFound: {
    title: 'Page not found',
    text: 'The page you are looking for does not exist or has moved.',
    home: 'Back to home',
  },
};

export const CONTENT: Record<Locale, Content> = { vi, en };
