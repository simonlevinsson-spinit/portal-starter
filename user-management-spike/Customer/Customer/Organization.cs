namespace Customer
{
    public class Organization
    {
        public HashSet<Project> Projects { get; } = new();
    }
}