using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Text.Json;
using TrionAPI.Models;


namespace TrionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentController : ControllerBase
    {
        private readonly IConfigurationService _configurationService;

        public AssignmentController(IConfigurationService configurationService)
        {
            _configurationService = configurationService;
        }
        [HttpPost]
        [Route("Submit")]
        public async Task<IActionResult> SubmitAssignment([FromBody] Assignment assignment)
        {
            string connectionString = _configurationService.GetConnectionString();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_DT_AssignmentDataMaster", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Opcode", assignment.Opcode);
                    cmd.Parameters.AddWithValue("@ClientID", assignment.ClientID);
                    cmd.Parameters.AddWithValue("@AssignmentID", assignment.AssignmentId);
                    cmd.Parameters.AddWithValue("@StartDate", assignment.StartDate);
                    cmd.Parameters.AddWithValue("@EndDate", assignment.EndDate);
                    cmd.Parameters.AddWithValue("@PeriodType", assignment.PeriodType);
                    cmd.Parameters.AddWithValue("@Mode", assignment.Mode);
                    cmd.Parameters.AddWithValue("@ProfessionalFee", assignment.ProfessionalFee);
                    cmd.Parameters.AddWithValue("@PeriodValue", assignment.PeriodValue);
                    cmd.Parameters.AddWithValue("@TotalAmount", assignment.TotalAmount);
                    cmd.Parameters.AddWithValue("@VatPercent", assignment.VatPercent);
                    cmd.Parameters.AddWithValue("@VatAmount", assignment.VatAmount);
                    cmd.Parameters.AddWithValue("@AmountIncVat", assignment.AmountIncVat);
                    cmd.Parameters.AddWithValue("@AuthorityFee", assignment.AuthorityFee);
                    cmd.Parameters.AddWithValue("@AdvancePercent", assignment.AdvancePercent);
                    cmd.Parameters.AddWithValue("@AdvanceAmount", assignment.AdvanceAmount);
                    cmd.Parameters.AddWithValue("@SubmittedBy", assignment.SubmittedBy);


                    cmd.Parameters.AddWithValue("@TRNNo", assignment.TRNNo);
                    cmd.Parameters.AddWithValue("@LicenseNo", assignment.LicenseNo);
                    cmd.Parameters.AddWithValue("@SignatoryName", assignment.SignatoryName);
                    cmd.Parameters.AddWithValue("@SignatoryDesignation", assignment.SignatoryDesignation);
                    cmd.Parameters.AddWithValue("@SignatoryContactNo", assignment.SignatoryContactNo);
                    cmd.Parameters.AddWithValue("@SignatoryEmail", assignment.SignatoryEmail);
                    cmd.Parameters.AddWithValue("@ConcernpersonName", assignment.ConcernpersonName);
                    cmd.Parameters.AddWithValue("@ConcernpersonDesignation", assignment.ConcernpersonDesignation);
                    cmd.Parameters.AddWithValue("@ConcernpersonContactNo", assignment.ConcernpersonContactNo);
                    cmd.Parameters.AddWithValue("@ConcernpersonEmail", assignment.ConcernpersonEmail);
                    

                    cmd.Parameters.AddWithValue("@DisplayStart", 0);
                    cmd.Parameters.AddWithValue("@DisplayLength", 10);
                    cmd.Parameters.AddWithValue("@SortCol", 1);
                    cmd.Parameters.AddWithValue("@SortDir", "asc");
                    cmd.Parameters.AddWithValue("@Search", "");
                    try
                    {
                        con.Open();
                        await cmd.ExecuteNonQueryAsync();
                        return Ok(new { result = true, message = "Assignment added successfully" });
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


        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> DeleteAssignment(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new { result = false, message = "Invalid ID" });
            }

            string connectionString = _configurationService.GetConnectionString();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_DT_AssignmentDataMaster", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Opcode", 3);
                    cmd.Parameters.AddWithValue("@Autoid ", id);
                    cmd.Parameters.AddWithValue("@ClientID", DBNull.Value);
                    cmd.Parameters.AddWithValue("@AssignmentID", id);
                    cmd.Parameters.AddWithValue("@StartDate", DBNull.Value);
                    cmd.Parameters.AddWithValue("@EndDate", DBNull.Value);
                    cmd.Parameters.AddWithValue("@PeriodType", DBNull.Value);
                    cmd.Parameters.AddWithValue("@Mode", DBNull.Value);
                    cmd.Parameters.AddWithValue("@ProfessionalFee", DBNull.Value);
                    cmd.Parameters.AddWithValue("@PeriodValue", DBNull.Value);
                    cmd.Parameters.AddWithValue("@TotalAmount", DBNull.Value);
                    cmd.Parameters.AddWithValue("@VatPercent", DBNull.Value);
                    cmd.Parameters.AddWithValue("@VatAmount", DBNull.Value);
                    cmd.Parameters.AddWithValue("@AmountIncVat", DBNull.Value);
                    cmd.Parameters.AddWithValue("@AuthorityFee", DBNull.Value);
                    cmd.Parameters.AddWithValue("@AdvancePercent", DBNull.Value);
                    cmd.Parameters.AddWithValue("@AdvanceAmount", DBNull.Value);
                    cmd.Parameters.AddWithValue("@SubmittedBy", DBNull.Value);
                    cmd.Parameters.AddWithValue("@DisplayStart", DBNull.Value);
                    cmd.Parameters.AddWithValue("@DisplayLength", DBNull.Value);
                    cmd.Parameters.AddWithValue("@SortCol", DBNull.Value);
                    cmd.Parameters.AddWithValue("@SortDir", DBNull.Value);
                    cmd.Parameters.AddWithValue("@Search", DBNull.Value);

                    try
                    {
                        con.Open();
                        int rowsAffected = await cmd.ExecuteNonQueryAsync();

                        if (rowsAffected > 0)
                        {
                            return Ok(new { result = true, message = "Assignment deleted successfully" });
                        }
                        else
                        {
                            return NotFound(new { result = false, message = "Assignment not found" });
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


        [HttpGet]
        [Route("AssignmentList")]
        public async Task<IActionResult> AssignmentList(
          [FromQuery] string Opcode,
          [FromQuery] int? ClientID,
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
                using (SqlCommand cmd = new SqlCommand("SP_DT_AssignmentDataMaster", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Opcode", Opcode);
                    cmd.Parameters.AddWithValue("@ClientID", ClientID);
                    cmd.Parameters.AddWithValue("@AssignmentID", "");
                    cmd.Parameters.AddWithValue("@StartDate", DateTime.Now.ToString("dd-MMM-yyyy"));
                    cmd.Parameters.AddWithValue("@EndDate", DateTime.Now.ToString("dd-MMM-yyyy"));
                    cmd.Parameters.AddWithValue("@PeriodType", "");
                    cmd.Parameters.AddWithValue("@Mode", "");
                    cmd.Parameters.AddWithValue("@ProfessionalFee", 0);
                    cmd.Parameters.AddWithValue("@PeriodValue", "");
                    cmd.Parameters.AddWithValue("@TotalAmount", 0);
                    cmd.Parameters.AddWithValue("@VatPercent", 0);
                    cmd.Parameters.AddWithValue("@VatAmount", 0);
                    cmd.Parameters.AddWithValue("@AmountIncVat", 0);
                    cmd.Parameters.AddWithValue("@AuthorityFee", 0);
                    cmd.Parameters.AddWithValue("@AdvancePercent", 0);
                    cmd.Parameters.AddWithValue("@AdvanceAmount", 0);
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


        [HttpPost]
        [Route("CreateEL")]
        public async Task<IActionResult> CreateEL([FromBody] JsonElement data)
        {
            try
            {
                string id = string.Empty;
                int clientId = 0;

                
                if (data.TryGetProperty("id", out JsonElement idElement))
                {
                    id = idElement.GetString(); // Get the 'id' as string
                }

            
                if (data.TryGetProperty("clientId", out JsonElement clientIdElement))
                {
                    clientId = clientIdElement.GetInt32();
                }
                    string connectionString = _configurationService.GetConnectionString();

                    using (SqlConnection con = new SqlConnection(connectionString))
                    {
                        using (SqlCommand cmd = new SqlCommand("SP_DT_AssignmentDataMaster", con))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@Opcode", 4);
                            cmd.Parameters.AddWithValue("@Autoid", DBNull.Value);
                            cmd.Parameters.AddWithValue("@ClientID", clientId);
                            cmd.Parameters.AddWithValue("@AssignmentID", DBNull.Value);
                            cmd.Parameters.AddWithValue("@StartDate", DBNull.Value);
                            cmd.Parameters.AddWithValue("@EndDate", DBNull.Value);
                            cmd.Parameters.AddWithValue("@PeriodType", DBNull.Value);
                            cmd.Parameters.AddWithValue("@Mode", DBNull.Value);
                            cmd.Parameters.AddWithValue("@ProfessionalFee", DBNull.Value);
                            cmd.Parameters.AddWithValue("@PeriodValue", DBNull.Value);
                            cmd.Parameters.AddWithValue("@TotalAmount", DBNull.Value);
                            cmd.Parameters.AddWithValue("@VatPercent", DBNull.Value);
                            cmd.Parameters.AddWithValue("@VatAmount", DBNull.Value);
                            cmd.Parameters.AddWithValue("@AmountIncVat", DBNull.Value);
                            cmd.Parameters.AddWithValue("@AuthorityFee", DBNull.Value);
                            cmd.Parameters.AddWithValue("@AdvancePercent", DBNull.Value);
                            cmd.Parameters.AddWithValue("@AdvanceAmount", DBNull.Value);
                            cmd.Parameters.AddWithValue("@AssignmentIDs", id); // Pass the id string to the stored procedure
                            cmd.Parameters.AddWithValue("@SubmittedBy", DBNull.Value);
                            cmd.Parameters.AddWithValue("@DisplayStart", DBNull.Value);
                            cmd.Parameters.AddWithValue("@DisplayLength", DBNull.Value);
                            cmd.Parameters.AddWithValue("@SortCol", DBNull.Value);
                            cmd.Parameters.AddWithValue("@SortDir", DBNull.Value);
                            cmd.Parameters.AddWithValue("@Search", DBNull.Value);

                            con.Open();
                            int rowsAffected = await cmd.ExecuteNonQueryAsync();

                            if (rowsAffected > 0)
                            {
                                return Ok(new { result = true, message = "Assignment processed successfully" });
                            }
                            else
                            {
                                return NotFound(new { result = false, message = "Assignment not found" });
                            }
                        }
                    }
                //}
                //else
                //{
                //    return BadRequest(new { result = false, message = "ID not found in request" });
                //}
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


        [HttpGet]
        [Route("ELList")]
        public async Task<IActionResult> ELList(
          [FromQuery] string Opcode,
          [FromQuery] int? ClientID,
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
                using (SqlCommand cmd = new SqlCommand("SP_DT_AssignmentDataMaster", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Opcode", Opcode);
                    cmd.Parameters.AddWithValue("@ClientID", ClientID);
                    cmd.Parameters.AddWithValue("@AssignmentID", "");
                    cmd.Parameters.AddWithValue("@StartDate", DateTime.Now.ToString("dd-MMM-yyyy"));
                    cmd.Parameters.AddWithValue("@EndDate", DateTime.Now.ToString("dd-MMM-yyyy"));
                    cmd.Parameters.AddWithValue("@PeriodType", "");
                    cmd.Parameters.AddWithValue("@Mode", "");
                    cmd.Parameters.AddWithValue("@ProfessionalFee", 0);
                    cmd.Parameters.AddWithValue("@PeriodValue", "");
                    cmd.Parameters.AddWithValue("@TotalAmount", 0);
                    cmd.Parameters.AddWithValue("@VatPercent", 0);
                    cmd.Parameters.AddWithValue("@VatAmount", 0);
                    cmd.Parameters.AddWithValue("@AmountIncVat", 0);
                    cmd.Parameters.AddWithValue("@AuthorityFee", 0);
                    cmd.Parameters.AddWithValue("@AdvancePercent", 0);
                    cmd.Parameters.AddWithValue("@AdvanceAmount", 0);
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


        [HttpPost]
        [Route("SubmitService")]
        public async Task<IActionResult> SubmitService([FromBody] Assignment assignment)
        {
            string connectionString = _configurationService.GetConnectionString();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_DT_AssignmentDataMaster", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Opcode", assignment.Opcode);
                    cmd.Parameters.AddWithValue("@ClientID", assignment.ClientID);
                    cmd.Parameters.AddWithValue("@AssignmentID", assignment.AssignmentId);
                    cmd.Parameters.AddWithValue("@StartDate", assignment.StartDate);
                    cmd.Parameters.AddWithValue("@EndDate", assignment.EndDate);
                    cmd.Parameters.AddWithValue("@PeriodType", assignment.PeriodType);
                    cmd.Parameters.AddWithValue("@Mode", assignment.Mode);
                    cmd.Parameters.AddWithValue("@ProfessionalFee", assignment.ProfessionalFee);
                    cmd.Parameters.AddWithValue("@PeriodValue", assignment.PeriodValue);
                    cmd.Parameters.AddWithValue("@TotalAmount", assignment.TotalAmount);
                    cmd.Parameters.AddWithValue("@VatPercent", assignment.VatPercent);
                    cmd.Parameters.AddWithValue("@VatAmount", assignment.VatAmount);
                    cmd.Parameters.AddWithValue("@AmountIncVat", assignment.AmountIncVat);
                    cmd.Parameters.AddWithValue("@AuthorityFee", assignment.AuthorityFee);
                    cmd.Parameters.AddWithValue("@AdvancePercent", assignment.AdvancePercent);
                    cmd.Parameters.AddWithValue("@AdvanceAmount", assignment.AdvanceAmount);
                    cmd.Parameters.AddWithValue("@SubmittedBy", assignment.SubmittedBy);


                    cmd.Parameters.AddWithValue("@TRNNo", assignment.TRNNo);
                    cmd.Parameters.AddWithValue("@LicenseNo", assignment.LicenseNo);
                    cmd.Parameters.AddWithValue("@SignatoryName", assignment.SignatoryName);
                    cmd.Parameters.AddWithValue("@SignatoryDesignation", assignment.SignatoryDesignation);
                    cmd.Parameters.AddWithValue("@SignatoryContactNo", assignment.SignatoryContactNo);
                    cmd.Parameters.AddWithValue("@SignatoryEmail", assignment.SignatoryEmail);
                    cmd.Parameters.AddWithValue("@ConcernpersonName", assignment.ConcernpersonName);
                    cmd.Parameters.AddWithValue("@ConcernpersonDesignation", assignment.ConcernpersonDesignation);
                    cmd.Parameters.AddWithValue("@ConcernpersonContactNo", assignment.ConcernpersonContactNo);
                    cmd.Parameters.AddWithValue("@ConcernpersonEmail", assignment.ConcernpersonEmail);


                    cmd.Parameters.AddWithValue("@AssignmentName", assignment.AssignmentName);
                    cmd.Parameters.AddWithValue("@ScopeOfWork", assignment.ScopeOfWork);
                    cmd.Parameters.AddWithValue("@Objectives", assignment.Objectives);
                    cmd.Parameters.AddWithValue("@FirstPartyResponsibility", assignment.FirstPartyResponsibility);
                    cmd.Parameters.AddWithValue("@SecondPartyResponsibility", assignment.SecondPartyResponsibility);
                    cmd.Parameters.AddWithValue("@Limitations", assignment.Limitations);
                    cmd.Parameters.AddWithValue("@Report", assignment.Report);
                    cmd.Parameters.AddWithValue("@OtherMatters", assignment.OtherMatters);
                    cmd.Parameters.AddWithValue("@ClientETC", assignment.ETC);

                    cmd.Parameters.AddWithValue("@DisplayStart", 0);
                    cmd.Parameters.AddWithValue("@DisplayLength", 10);
                    cmd.Parameters.AddWithValue("@SortCol", 1);
                    cmd.Parameters.AddWithValue("@SortDir", "asc");
                    cmd.Parameters.AddWithValue("@Search", "");
                    try
                    {
                        con.Open();
                        await cmd.ExecuteNonQueryAsync();
                        return Ok(new { result = true, message = "Assignment added successfully" });
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
