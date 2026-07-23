import { Webhook } from "svix";
import User from "../models/User.js";

const clerkWebhooks = async (req, res) => {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    webhook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    console.log("Webhook Event :", type);

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          email: data.email_addresses?.[0]?.email_address || "",
          imageUrl: data.image_url || "",
        };

        await User.create(userData);

        console.log("✅ User Created");

        return res.status(200).json({
          success: true,
        });
      }

      case "user.updated": {
        const userData = {
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          email: data.email_addresses?.[0]?.email_address || "",
          imageUrl: data.image_url || "",
        };

        await User.findByIdAndUpdate(data.id, userData, {
          new: true,
        });

        console.log("✅ User Updated");

        return res.status(200).json({
          success: true,
        });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);

        console.log("🗑 User Deleted");

        return res.status(200).json({
          success: true,
        });
      }

      default:
        return res.status(200).json({
          success: true,
          message: "Unhandled Event",
        });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default clerkWebhooks;