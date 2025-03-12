namespace UserWebApi.Models
{
    public class User
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }

        public User(string id, string username, string email)
        {
            this.Id = id;
            this.Username = username;
            this.Email =email;
           
        }
    }
}
