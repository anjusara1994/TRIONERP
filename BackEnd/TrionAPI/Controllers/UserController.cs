using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using TrionAPI.Models;
using TrionAPI.Services;

namespace TrionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfigurationService _configurationService;
        private readonly DropdownDataService _dropdownService;
        public UserController(IConfigurationService configurationService, DropdownDataService dropdownService)
        {
            _configurationService = configurationService;
            _dropdownService = dropdownService;
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] User user)
        {
            string connectionString = _configurationService.GetConnectionString();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_DT_EmployeeMaster", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserName", user.UserName);
                    cmd.Parameters.AddWithValue("@SystemPassword", user.SystemPassword);

                    con.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Employee PL = new Employee();
                            PL.EMPID = reader["EMPID"].ToString();
                            PL.EmailId = reader["EmailId"].ToString();
                            PL.FirstName = reader["FirstName"].ToString();
                            PL.LastName = reader["LastName"].ToString();
                            PL.ProfilePic = reader["ProfilePic"].ToString();
                            return Ok(new { result = true, message = "Login success", data = PL });
                        }
                        else
                        {
                            return Ok(new { result = false, message = "Invalid User" });
                        }
                    }
                }
            }
        }

        
        
        [HttpGet("Menu")]
        public async Task<IActionResult> GetMenu(int EmpId)
        {
            var OpCode = "1";
            var Menu = await _dropdownService.GetMenuDetails(OpCode, EmpId);
            return Ok(Menu);
        }
    }
}
