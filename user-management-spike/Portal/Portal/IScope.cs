namespace Portal
{
    public interface IScope<T>
    {
        HashSet<T> AvailableValues(IUser user);
    }
}