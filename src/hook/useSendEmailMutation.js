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
              email: "ghostdeveloper@yopmail.com",
              name: "Amaraé",
            },
          ],
          subject: payload.subject,
          htmlContent: payload.htmlContent,
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

  return { isLoading, onSendEmail };
};
