using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceModule.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class RentalsController : ControllerBase
    {
        private static readonly string[] Rentals = new[]
        {
            "Discokula", "DJ-anläggning", "Rökmaskin", "Kaniner", "Karaoke", "Bartender"
    };

        private readonly ILogger<RentalsController> _logger;

        public RentalsController(ILogger<RentalsController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetRentals")]
        public IEnumerable<Rental> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new Rental
            {
                Quantity = Random.Shared.Next(0, 10*index),
                Item = Rentals[Random.Shared.Next(Rentals.Length)]
            })
            .ToArray();
        }
    }
}
