namespace iinotify.Common
{
    public interface IConfigurationReader<out T> where T : new()
    {
        T GetConfig();
    }
}