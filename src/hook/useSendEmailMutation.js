import axios from "axios";
import * as React from "react";

export const useSendEmailMutation = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const onSendEmail = async (payload) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: {
            name: payload.name,
            email: payload.email,
          },
          to: [
            {
              email: "support@amarae.io",
              name: "Amaraé",
            },
          ],
          subject: "New Contact Form Submission",
          htmlContent: `
                  <h1>New Contact Form Submission</h1>
                  <p><strong>Name:</strong> ${payload.name}</p>
                  <p><strong>Email:</strong> ${payload.email}</p>
                  <p><strong>Message:</strong> ${payload.message}</p>
                `,
        },
        {
          headers: {
            accept: "application/json",
            "api-key": process.env.REACT_APP_BREVO_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, setIsLoading };
};
