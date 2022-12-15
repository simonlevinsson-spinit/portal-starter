using Customer;

using UserModule;

namespace InvoiceModule
{
    public class ReadProjectInvoicesFeature : IFeature
    {
        public HashSet<IDimension> Dimensions { get =>
            new() { CustomerDimensions.Project };
             }
        
    }
}