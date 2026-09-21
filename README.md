# Giải Quyết Mâu Thuẫn Với Bạn Bè

Mini game giáo dục kỹ năng sống cho học sinh khối 4 (9–10 tuổi), chủ đề **"Giải quyết mâu thuẫn với bạn bè"**. Chạy tốt trên máy chiếu lớp học (16:9) lẫn tablet/điện thoại theo nhóm.

## Stack

- Next.js (App Router) + TypeScript
- TailwindCSS
- Framer Motion
- Không backend/database — dữ liệu là JSON tĩnh
- Âm thanh tự sinh bằng Web Audio API (không cần file mp3)

## Chạy dự án

```bash
yarn install
yarn dev
```

Mở [http://localhost:3000](http://localhost:3000).

Build production:

```bash
yarn build
yarn start
```

## Cấu trúc

```
app/            layout + trang chủ (điều phối các màn chơi)
components/     Card, MemoryGame, QuizQuestion, ResultScreen, FinalResult...
data/           wordPairs.json (Chặng 1), scenarios.json (Chặng 2)
hooks/          useGameState (state machine), useSound
lib/            types.ts, sound.ts (Web Audio API)
```

## Nội dung game

**Chặng 1 — Ghép Đôi Trái Nghĩa**: game lật thẻ (memory match), 8 cặp từ trái nghĩa, đếm ngược 90 giây.

**Chặng 2 — Chọn Cách Ứng Xử Thông Minh**: 4 tình huống trắc nghiệm về cách xử lý mâu thuẫn với bạn bè.

**Tổng kết**: tổng điểm + huy hiệu động viên (không có huy hiệu tiêu cực).

## Đổi nội dung bài học

Toàn bộ nội dung nằm trong `data/wordPairs.json` và `data/scenarios.json`. Muốn đổi bộ từ/tình huống cho bài học kỹ năng sống khác, chỉ cần sửa 2 file JSON này — không cần sửa logic component.
