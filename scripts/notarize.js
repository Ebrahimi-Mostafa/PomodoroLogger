const notarize = require('electron-builder-notarize');

function getEnv(nameList) {
    for (const name of nameList) {
        if (process.env[name]) {
            return process.env[name];
        }
    }
    return undefined;
}

module.exports = async function notarizeIfConfigured(context) {
    const skipNotarize = ['1', 'true', 'yes'].includes(
        String(process.env.SKIP_NOTARIZE || '').toLowerCase()
    );
    const appleId = getEnv(['APPLEID', 'APPLE_ID']);
    const appleIdPass = getEnv(['APPLEIDPASS', 'APPLE_APP_SPECIFIC_PASSWORD']);
    const teamId = getEnv(['TEAM_ID', 'APPLE_TEAM_ID']);

    if (skipNotarize || !appleId || !appleIdPass || !teamId) {
        console.log('[notarize] Skipping notarization (missing creds or SKIP_NOTARIZE).');
        return;
    }

    return notarize(context);
};
