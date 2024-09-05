using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using TrionAPI.Models;


namespace TrionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeadController : ControllerBase
    {
        private readonly IConfigurationService _configurationService;

        public LeadController(IConfigurationService configurationService)
        {
            _configurationService = configurationService;
        }

        [HttpPost] 
        [Route("Submit")]
        public async Task<IActionResult> SubmitLead([FromBody] Lead lead)
        {
            string connectionString = _configurationService.GetConnectionString();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_DT_LeadMaster", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Opcode", lead.Opcode);
                    cmd.Parameters.AddWithValue("@SalesPerson", lead.SalesPerson);
                    cmd.Parameters.AddWithValue("@Authority", lead.Authority);
                    cmd.Parameters.AddWithValue("@Source", lead.Source);
                    cmd.Parameters.AddWithValue("@CompanyName", lead.CompanyName);
                    cmd.Parameters.AddWithValue("@Landline", lead.Landline);
                    cmd.Parameters.AddWithValue("@ContactPerson", lead.ContactPerson);
                    cmd.Parameters.AddWithValue("@Designation", lead.Designation);
                    cmd.Parameters.AddWithValue("@MobileNumber", lead.MobileNumber);
                    cmd.Parameters.AddWithValue("@EmailId", lead.EmailId);
                    cmd.Parameters.AddWithValue("@Address", lead.Address);
                    cmd.Parameters.AddWithValue("@Area", lead.Area);
                    cmd.Parameters.AddWithValue("@Emirates", lead.Emirates);
                    cmd.Parameters.AddWithValue("@Country", lead.Country);
                    cmd.Parameters.AddWithValue("@SubmittedBy", lead.SubmittedBy);
                    cmd.Parameters.AddWithValue("@DisplayStart", 1);
                    cmd.Parameters.AddWithValue("@DisplayLength", 1);
                    cmd.Parameters.AddWithValue("@SortCol", 1);
                    cmd.Parameters.AddWithValue("@SortDir", "");
                    cmd.Parameters.AddWithValue("@Search", "");

                    try
                    {
                        con.Open();
                        await cmd.ExecuteNonQueryAsync();
                        return Ok(new { result = true, message = "Lead submitted successfully" });
                    }
                    catch (SqlException ex)
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, new { result = false, message = $"Database error: {ex.Message}" });
                    }
                    catch (Exception ex)
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, new { result = false, message = $"Unexpected error: {ex.Message}" });
                    }
                }
            }
        }



        [HttpGet]
        [Route("LeadList")]
        public async Task<IActionResult> LeadList(
            [FromQuery] string Opcode,
            [FromQuery] int? SalesPerson,
            [FromQuery] int? Authority,
            [FromQuery] int? Source,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] int draw = 1,
            [FromQuery] string search = "",
            [FromQuery] int sortColumnIndex = 0,
            [FromQuery] string sortDirection = "asc")
        {
            int displayStart = (page - 1) * pageSize;
            int displayLength = pageSize;

            string connectionString = _configurationService.GetConnectionString();
            var result = new List<Dictionary<string, object>>();
            int totalRecords = 0;
            int filteredRecords = 0;
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_DT_LeadMaster", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Opcode", Opcode);
                    cmd.Parameters.AddWithValue("@SalesPerson",SalesPerson);
                    cmd.Parameters.AddWithValue("@Authority", Authority);
                    cmd.Parameters.AddWithValue("@Source", Source);
                    cmd.Parameters.AddWithValue("@CompanyName", "");
                    cmd.Parameters.AddWithValue("@Landline", "");
                    cmd.Parameters.AddWithValue("@ContactPerson", "");
                    cmd.Parameters.AddWithValue("@Designation", "");
                    cmd.Parameters.AddWithValue("@MobileNumber", "");
                    cmd.Parameters.AddWithValue("@EmailId", "");
                    cmd.Parameters.AddWithValue("@Address", "");
                    cmd.Parameters.AddWithValue("@Area", "");
                    cmd.Parameters.AddWithValue("@Emirates", "");
                    cmd.Parameters.AddWithValue("@Country", "");
                    cmd.Parameters.AddWithValue("@SubmittedBy", "");

                    cmd.Parameters.AddWithValue("@DisplayStart", displayStart);
                    cmd.Parameters.AddWithValue("@DisplayLength", displayLength);
                    cmd.Parameters.AddWithValue("@SortCol", sortColumnIndex);
                    cmd.Parameters.AddWithValue("@SortDir", sortDirection);
                    cmd.Parameters.AddWithValue("@Search", search);

                    try
                    {
                        con.Open();
                        using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                        {
                            var data = new List<Dictionary<string, object>>();
                            while (await reader.ReadAsync())
                            {
                                var row = new Dictionary<string, object>();

                                for (int i = 0; i < reader.FieldCount; i++)
                                {
                                    string columnName = reader.GetName(i);
                                    object? value = reader.IsDBNull(i) ? null : reader.GetValue(i);
                                    row.Add(columnName, value);
                                }

                                data.Add(row);
                            }
                            foreach (var row in data)
                            {
                                if (row.TryGetValue("totalRecords", out var totalRecordsValue) && totalRecordsValue is int total)
                                {
                                    totalRecords = total;
                                }

                                if (row.TryGetValue("totalfilteredRecords", out var filteredRecordsValue) && filteredRecordsValue is int filtered)
                                {
                                    filteredRecords = filtered;
                                }
                            }

                            return Ok(new
                        {
                            draw = Request.Query["draw"].FirstOrDefault(),
                            recordsTotal = totalRecords,
                            recordsFiltered = filteredRecords,
                            data = data
                        });
                        }
                    }
                    catch (SqlException ex)
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, new { result = false, message = $"Database error: {ex.Message}" });
                    }
                    catch (Exception ex)
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, new { result = false, message = $"Unexpected error: {ex.Message}" });
                    }
                }
            }
        }
    }
}
