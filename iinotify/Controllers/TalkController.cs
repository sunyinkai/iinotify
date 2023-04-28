using iinotify.OpenAI;
using Microsoft.AspNetCore.Mvc;

namespace iinotify.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TalkController : ControllerBase
    {
        private readonly IOpenAIService _openAIService;
        private readonly ILogger<TalkController> _logger;

        public TalkController(ILogger<TalkController> logger)
        {
            _logger = logger;
            _openAIService = new OpenAIService();
        }

        [HttpPost]
        public string Chat()
        {
            return _openAIService.Chat("When was Microsoft founded");
        }
    }
}