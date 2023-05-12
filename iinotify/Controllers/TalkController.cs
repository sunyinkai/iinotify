using iinotify.ActionFilters;
using iinotify.OpenAI;
using Microsoft.AspNetCore.Authorization;
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
        [AuthZ]
        public async Task<ActionResult<string>> Chat()
        {
            var formData = HttpContext.Request.Form;
            string message = formData["message"];
            if (message == null)
            {
                return BadRequest("No content provided");
            }

            return await _openAIService.Chat(message);
        }
    }
}