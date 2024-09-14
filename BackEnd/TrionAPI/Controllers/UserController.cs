using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using TrionAPI.Models;
using TrionAPI.Services;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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

        //[HttpPost]
        //[Route("Login")]
        //public IActionResult Login([FromBody] User user)
        //{
        //    string connectionString = _configurationService.GetConnectionString();

        //    using (SqlConnection con = new SqlConnection(connectionString))
        //    {
        //        using (SqlCommand cmd = new SqlCommand("SP_DT_EmployeeMaster", con))
        //        {
        //            cmd.CommandType = CommandType.StoredProcedure;
        //            cmd.Parameters.AddWithValue("@UserName", user.UserName);
        //            cmd.Parameters.AddWithValue("@SystemPassword", user.SystemPassword);

        //            con.Open();
        //            using (SqlDataReader reader = cmd.ExecuteReader())
        //            {
        //                if (reader.Read())
        //                {
        //                    Employee PL = new Employee();
        //                    PL.EMPID = reader["EMPID"].ToString();
        //                    PL.EmailId = reader["EmailId"].ToString();
        //                    PL.FirstName = reader["FirstName"].ToString();
        //                    PL.LastName = reader["LastName"].ToString();
        //                    PL.ProfilePic = reader["ProfilePic"].ToString();
        //                    return Ok(new { result = true, message = "Login success", data = PL });
        //                }
        //                else
        //                {
        //                    return Ok(new { result = false, message = "Invalid User" });
        //                }
        //            }
        //        }
        //    }
        //}


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
                            Employee PL = new Employee
                            {
                                ID = (int?)reader["ID"],
                                EMPID = reader["EMPID"].ToString(),
                                EmailId = reader["EmailId"].ToString(),
                                FirstName = reader["FirstName"].ToString(),
                                LastName = reader["LastName"].ToString(),
                                ProfilePic = reader["ProfilePic"].ToString()
                            };

                            // Create token handler and token descriptor
                            var tokenHandler = new JwtSecurityTokenHandler();
                            var key = Encoding.ASCII.GetBytes("3W5HYk2YPtWHD5Fhb0K+Qe1+jp4E4Qz+68Qz/9Eb6DA=");
                            var tokenDescriptor = new SecurityTokenDescriptor
                            {
                                Subject = new ClaimsIdentity(new[]
                                {
                                        new Claim("EMPID", PL.EMPID),
                                        new Claim("EmailId", PL.EmailId),
                                        new Claim(ClaimTypes.Name, PL.FirstName + " " + PL.LastName)
                                }),
                                Expires = DateTime.UtcNow.AddHours(1), // Token expiration time
                                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                                Issuer = "http://localhost:5242/",
                                Audience = "http://localhost:4200/"
                            };

                            // Generate token
                            var token = tokenHandler.CreateToken(tokenDescriptor);
                            var tokenString = tokenHandler.WriteToken(token);

                            return Ok(new { result = true, message = "Login success", token = tokenString, data = PL });
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
