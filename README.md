# ChatPilot - Next-Gen AI WhatsApp Marketing Platform 🚀

ChatPilot is a high-performance, AI-driven SaaS platform designed for WhatsApp productivity and marketing. It helps businesses and individuals create, improve, and manage their WhatsApp communication with cutting-edge AI and specialized utility tools.

---

## 🏗️ Technical Architecture Deep Dive

ChatPilot is built with a focus on **modular architecture**, **type safety**, and **provider-agnostic AI integration**.

### 1. The Global Layout Engine (`src/app/(dashboard)`)
One of the core performance features is the use of **Next.js Route Groups**. 
- All tools are wrapped in a shared layout that includes the **Sidebar** and **Header**.
- **Performance Benefit**: Navigating between `/tools/link-generator` and `/ai/marketing-copy` does NOT re-render the sidebar or header. Only the main content area changes, providing a "SPA-like" instant feel.

### 2. AI Abstraction Layer (`src/lib/ai`)
The system is designed to be independent of any single LLM provider (like Groq or OpenAI).
- **The Manager (`ai-service.ts`)**: This is the orchestrator. It receives a tool name (e.g., `messageGenerator`) and inputs, then decides which model to use and how to format the prompt.
- **Base Architecture**:
  ```mermaid
  graph TD
    UI[Frontend UI] --> API[Next.js API Route /api/ai/*]
    API --> Manager[AI Service Manager]
    Manager --> Provider[Active AI Provider Class]
    Provider --> External[External LLM API Groq/OpenAI]
  ```
- **Provider Interface**: Every provider must implement the `AIProvider` interface. This ensures that if you want to switch to a different AI in the future, you only need to create one new file in `src/lib/ai/providers/`.

### 3. Responsive Theme Engine
- **Dynamic CSS Variables**: The theme system doesn't just swap classes; it swaps global CSS variables (`--primary`, `--secondary`).
- **Persistence**: Using a custom `ThemeProvider`, user preferences are instantly applied from `localStorage` on page load, preventing the "white flash" in dark mode.

---

## 📂 Detailed Project Structure

### `src/app/` (The Routing Heart)
- **`(dashboard)/`**: Contains the main application tools. Grouped here to share the common layout.
- **`api/ai/`**: Every AI tool has its own API endpoint. This keeps server-side logic (like API keys) hidden from the client.
- **`blog/`**: A built-in SEO-optimized section for marketing content.

### `src/components/` (UI Building Blocks)
- **`layout/`**: `Navbar.tsx` (top navigation), `DashboardLayout.tsx` (sidebar logic), and `Footer.tsx`.
- **`ui/`**: Reusable components like `Button.tsx` (with built-in loading states), `Card.tsx`, and input fields.
- **`landing/`**: Specialized components used only on the homepage (Hero, Features, Testimonials).

### `src/lib/` (The Logic Layer)
- **`ai/`**: Implementation of the provider-agnostic system.
  - `providers/groq.ts`: The current active implementation using Llama 3.3.
- **`ai-service.ts`**: The core manager that handles all AI tool prompts.
- **`whatsapp.ts`**: Contains the complex regex and formatting logic for WhatsApp links and markdown-to-WhatsApp conversion.
- **`utils.ts`**: `cn()` for class merging and phone number validation logic.

### `src/lib/__tests__/` & `src/components/.../__tests__/`
- **Unit & Integration Tests**: 35+ tests covering everything from basic button clicks to complex AI response handling.

---

## 🧪 Testing & Quality Assurance

ChatPilot uses **Jest** with a custom environment setup to handle browser-specific APIs like `TextEncoder`.

### What is being tested?
1.  **Utilities**: Ensures that phone numbers are correctly formatted and WhatsApp links are safe and valid.
2.  **UI Components**: Tests that the Sidebar opens on mobile, the Theme Switcher updates colors, and buttons show loaders when clicked.
3.  **API Integration**: Mocks the AI Service to ensure that if the AI API is down, our frontend shows a professional error message instead of crashing.

---

## 🚀 Deployment & Scaling

### How to Scale?
- **Adding a new AI Tool**: 
  1. Define a prompt in `src/lib/ai-service.ts`.
  2. Create an API route in `src/app/api/ai/`.
  3. Create a frontend page in `src/app/(dashboard)/ai/`.
- **Switching Providers**: Change the provider initialization in `src/lib/ai-service.ts`.

---

**ChatPilot is built for speed, beauty, and long-term maintainability.**
