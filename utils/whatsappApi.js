/**
 * Send a WhatsApp message using whatever WhatsApp API service you'll implement
 * This is a placeholder function for future implementation
 *
 * @param {string} phoneNumber - The recipient's phone number in international format (no + prefix)
 * @param {string} message - The message text to send
 * @returns {Promise<{success: boolean, message: string}>} - Response object
 */
export async function sendWhatsAppMessage(phoneNumber, message) {
  try {
    // This is a placeholder for future implementation with an actual WhatsApp API
    // Examples of services you could use:
    // 1. Twilio API
    // 2. WhatsApp Business API
    // 3. 360dialog.com
    // 4. MessageBird

    console.log(`Would send WhatsApp message to ${phoneNumber}:`, message);

    // For now, just return success
    return {
      success: true,
      message: "WhatsApp message would be sent (placeholder)",
    };

    // When implemented with a real service, it would look something like:
    /*
    const response = await fetch('https://api.whatsapp-service.com/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WHATSAPP_API_KEY}`
      },
      body: JSON.stringify({
        to: phoneNumber,
        message: message
      })
    });
    
    const data = await response.json();
    return {
      success: response.ok,
      message: data.message || 'Message sent successfully'
    };
    */
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return {
      success: false,
      message: error.message || "Failed to send WhatsApp message",
    };
  }
}

/**
 * Format a WhatsApp message for Kilimanjaro booking
 *
 * @param {Object} formData - The form data object
 * @returns {string} - Formatted message
 */
export function formatKilimanjaroWhatsAppMessage(formData) {
  const { firstName, lastName, routeName, packageType, dateRange, daysCount } =
    formData;

  return (
    `*New Kilimanjaro Booking Request*\n\n` +
    `Customer: ${firstName} ${lastName}\n` +
    `Route: ${routeName}\n` +
    `Package: ${packageType}\n` +
    `Date: ${dateRange}\n` +
    `Duration: ${daysCount} days\n\n` +
    `Please contact the customer to finalize their booking. Thanks!`
  );
}
