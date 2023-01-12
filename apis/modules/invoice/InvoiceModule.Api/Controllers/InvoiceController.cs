using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace InvoiceModule.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class InvoiceController : ControllerBase
    {
        private readonly ILogger<InvoiceController> _logger;

        public InvoiceController(ILogger<InvoiceController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetInvoices")]
        public IEnumerable<Invoice> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new Invoice
            {
                DueDate = DateOnly.FromDateTime(DateTime.Now.AddDays(Random.Shared.Next(0,index))),
                Amount = Random.Shared.Next(0, 1000*index),
            })
            .ToArray();
        }
    }
}
