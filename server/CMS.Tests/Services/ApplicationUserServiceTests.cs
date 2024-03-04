using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS.Tests.Services
{
    public class ApplicationUserServiceTests : ServiceTestsBase
    {
       
        [Fact]
        public void Test1()
        {
            var users = _context.Users;
            
            foreach (var user in users)
            {
                Console.WriteLine(user.FirstName);
            }

            users.Should().NotBeNull();
        }
    }
}
