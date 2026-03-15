# ChatPilot - Product Guidance & Developer Playbook 📌

This document provides a detailed breakdown of ChatPilot's product philosophy, user journeys, and a playbook for developers looking to extend the platform.

---

## 👥 Granular User Journeys

### 1. The High-Volume Marketer
- **Persona**: Needs to scale campaigns across multiple WhatsApp groups.
- **Workflow**:
  1. **Brainstorming**: Uses **Marketing Copy Generator** with "Professional" tone to get 3-4 variations.
  2. **Optimization**: Pastes the best variation into **Message Improver** to refine the "Hook."
  3. **Personalization**: Uses **Message Personalizer** to add placeholders for customer names.
  4. **Distribution**: Opens **Link Generator** to create a link like `wa.me/number?text=Hi, [Name]!`.
  5. **Visuals**: Generates a **QR Code** for the link and downloads it for a promotional flyer.

### 2. The Customer Support Team
- **Persona**: Focuses on speed and empathy.
- **Workflow**:
  1. **Incoming**: Paste a frustrated customer message into **Customer Reply**.
  2. **Tone Shift**: Selects "Apologetic" tone.
  3. **Verification**: Checks the generated message for accuracy.
  4. **Emoji Polish**: Runs the message through **Emoji Suggester** to make it feel more approachable.
  5. **Quick Replies**: Saves the final result in the **Template Library** (internal process) for future use.

---

## 🛠️ Developer Playbook: How to Extend ChatPilot

### 1. Adding a New AI Tool
If you want to add a tool like "AI Blog Writer":
1.  **Backend Integration**:
    - Open `src/lib/ai-service.ts`.
    - Add a new case to the switch statement:
      ```typescript
      case 'blogWriter':
        prompt = `Write a blog post about ${inputs.topic} in ${inputs.tone} style...`;
        break;
      ```
2.  **API Route**:
    - Create `src/app/api/ai/blog-writer/route.ts`.
    - Follow the pattern: `return aiService.generate('blogWriter', { topic, tone })`.
3.  **Frontend Component**:
    - Create `src/app/(dashboard)/ai/blog-writer/page.tsx`.
    - Use the `Button` component with `isLoading` prop for a native feel.

### 2. Modifying the Theme System
Themes are defined in `src/lib/constants.ts`. To add a "Cyberpunk" theme:
- Add an object: `{ id: 'cyberpunk', name: 'Cyberpunk', primary: '#ff00ff', secondary: '#00ffff' }`.
- The system will automatically add it to the Navbar's theme switcher and apply the colors globally.

---

## 📐 Technical Flow Analysis

### Data Journey:
1.  **User Input**: User types context in a text area on the frontend.
2.  **State Management**: React state handles the input and tone selection.
3.  **API Call**: `fetch('/api/ai/tool-name')` sends a POST request with the JSON payload.
4.  **Security**: The API route reads the `GROQ_API_KEY` from the server environment, keeping it safe from the browser.
5.  **AI Processing**: `aiService` formats the prompt and calls the active Provider (Groq).
6.  **Streaming/Response**: The response is sent back as JSON, which the frontend displays in a `min-h-[400px]` container.

---

## 🎨 UI/UX Philosophy
- **Loading States**: No action should ever happen without visual feedback. Always use the `Button` loader.
- **Accessibility**: Use semantic HTML (h1, h2, aside, main) and ensure all icons have aria-labels or descriptions.
- **Micro-animations**: Use `framer-motion` (Motion) for entry animations to make the platform feel like a premium SaaS application.

---

**ChatPilot is designed to be the ultimate companion for WhatsApp growth.**
