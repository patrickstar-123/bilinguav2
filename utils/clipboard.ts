/**
 * Robust clipboard utility with fallback mechanisms
 * Handles clipboard API restrictions and provides legacy fallback
 */

/**
 * Copy text to clipboard with multiple fallback methods
 * @param text - Text to copy to clipboard
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Method 1: Modern Clipboard API (preferred)
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.warn('Clipboard API failed, trying fallback method:', error);
      // Fall through to fallback methods
    }
  }

  // Method 2: Legacy execCommand fallback
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Make the textarea invisible but accessible
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.style.opacity = '0';
    textArea.setAttribute('readonly', '');
    
    document.body.appendChild(textArea);
    
    // Select the text
    if (navigator.userAgent.match(/ipad|iphone/i)) {
      // iOS specific handling
      const range = document.createRange();
      range.selectNodeContents(textArea);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }
    
    // Copy the text
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    if (successful) {
      return true;
    }
  } catch (error) {
    console.error('Legacy copy method failed:', error);
  }

  // Method 3: Create a temporary input for mobile devices
  try {
    const input = document.createElement('input');
    input.value = text;
    input.style.position = 'absolute';
    input.style.left = '-9999px';
    document.body.appendChild(input);
    input.focus();
    input.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(input);
    
    if (successful) {
      return true;
    }
  } catch (error) {
    console.error('Input copy method failed:', error);
  }

  // All methods failed
  return false;
}

/**
 * Copy text to clipboard and show appropriate feedback
 * @param text - Text to copy
 * @param successMessage - Message to show on success
 * @param errorMessage - Message to show on error
 */
export async function copyToClipboardWithFeedback(
  text: string,
  successMessage: string = 'Copied to clipboard! 📋',
  errorMessage: string = 'Unable to copy. Please copy manually.'
): Promise<void> {
  const success = await copyToClipboard(text);
  
  if (success) {
    alert(successMessage);
  } else {
    // Show the text in a prompt so user can copy manually
    const promptMessage = `${errorMessage}\n\nPlease copy this text manually:\n\n${text}`;
    if (window.confirm(promptMessage + '\n\nPress OK to dismiss.')) {
      // User acknowledged
    }
  }
}

/**
 * Check if clipboard API is available
 */
export function isClipboardAvailable(): boolean {
  return !!(navigator.clipboard && navigator.clipboard.writeText);
}
