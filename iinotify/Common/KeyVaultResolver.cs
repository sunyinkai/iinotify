using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using iinotify.Common.Configuraitons;

namespace iinotify.Common
{
    public class KeyVaultResolver
    {
        private readonly IConfigurationReader<KeyVaultConfigurations> _configurationReader;

        public KeyVaultResolver()
        {
            _configurationReader = new ConfigurationReader<KeyVaultConfigurations>();
        }

        public async Task<string> GetSecrectAsync(string secrectName)
        {
            string keyVaultUrl = this._configurationReader.GetConfig().KeyVaultURI;
            string managedIdentityClientID = this._configurationReader.GetConfig().ManagedIdentityClientID;

            ManagedIdentityCredential credential = new ManagedIdentityCredential(managedIdentityClientID);
            SecretClient client = new SecretClient(new Uri(keyVaultUrl), credential);
            KeyVaultSecret secret = await client.GetSecretAsync(secrectName);

            return secret.Value;
        }
    }
}