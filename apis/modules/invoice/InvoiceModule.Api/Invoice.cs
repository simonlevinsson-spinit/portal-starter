namespace InvoiceModule.Api
{
    public class Invoice
    {
        public DateOnly DueDate { get; set; }

        public decimal Amount { get; set; }
    }
}