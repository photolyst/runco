const jwt = require("jsonwebtoken");

async function main() {
  const teamId = process.env.APPLE_TEAM_ID;
  const clientId = process.env.APPLE_CLIENT_ID;
  const keyId = process.env.APPLE_KEY_ID;
  let privateKey = process.env.APPLE_PRIVATE_KEY;
  const supabaseRef = process.env.SUPABASE_PROJECT_REF;
  const supabaseToken = process.env.SUPABASE_ACCESS_TOKEN;

  if (
    !teamId ||
    !clientId ||
    !keyId ||
    !privateKey ||
    !supabaseRef ||
    !supabaseToken
  ) {
    console.error(
      "Missing required environment variables. Please check your GitHub Secrets.",
    );
    process.exit(1);
  }

  // Ensure private key has correct line breaks if passed via env var as a single line
  privateKey = privateKey.replace(/\\n/g, "\n");

  try {
    console.log("Generating new Apple OAuth secret...");
    // Sign JWT valid for 6 months (180 days)
    const secret = jwt.sign({}, privateKey, {
      algorithm: "ES256",
      keyid: keyId,
      issuer: teamId,
      audience: "https://appleid.apple.com",
      subject: clientId,
      expiresIn: "180d",
    });

    console.log(
      "✅ Successfully generated new Apple OAuth secret (Valid for 180 days).",
    );

    const url = `https://api.supabase.com/v1/projects/${supabaseRef}/config/auth`;

    console.log(`Updating Supabase project: ${supabaseRef}...`);

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supabaseToken}`,
      },
      body: JSON.stringify({
        external_apple_client_id: clientId,
        external_apple_secret: secret,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(
        `❌ Failed to update Supabase config: ${response.status} ${response.statusText}`,
      );
      console.error(errText);
      process.exit(1);
    }

    console.log("✅ Successfully updated Supabase Auth with new Apple Secret!");
  } catch (error) {
    console.error("❌ An error occurred during the rotation process:", error);
    process.exit(1);
  }
}

main().catch(console.error);
