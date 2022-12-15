using Customer;

using UserModule;

namespace OrderModule
{
    public class CreateOrderFeature : IFeature
    {
        public List<HashSet<IDimension>> Dimensions => new()
        {
            new (){ CustomerDimensions.Project },
            new (){ CustomerDimensions.Organization }
        };
    }
}