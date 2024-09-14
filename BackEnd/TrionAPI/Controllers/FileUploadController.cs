using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Reflection.Emit;
using TrionAPI.Models;

namespace TrionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class FileUploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IConfigurationService _configurationService;

        public FileUploadController(IWebHostEnvironment hostingEnvironment, IConfiguration configuration, IConfigurationService configurationService)
        {
            _hostingEnvironment = hostingEnvironment;
            _configurationService = configurationService;
        }
        [HttpPost("upload")]
        public async Task<IActionResult> UploadSignature([FromBody] FileUpload request)
        {
            try
            {

            
            if (string.IsNullOrEmpty(request.File))
            {
                return BadRequest("Signature is required.");
            }
                
            string folder = string.IsNullOrEmpty(request.FileFolder) ? "FileUploads" : request.FileFolder;
            var folderName = Path.Combine("uploads", folder);
            string fileName = Guid.NewGuid().ToString() + ".png";
            var webRootPath = _hostingEnvironment.WebRootPath;
            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }
                var filePath = Path.Combine(uploadPath, fileName);
                folderName = Path.Combine(folderName, fileName);
                try
             {
                var imageBytes = Convert.FromBase64String(request.File.Split(',')[1]);
                using (var fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write, FileShare.None, bufferSize: 4096, useAsync: true))
                {
                    await fileStream.WriteAsync(imageBytes, 0, imageBytes.Length);
                }
                    await SaveFilePathToDatabase(fileName, folderName, request.Opcode,request.autoid);

                return Ok(new { FilePath = filePath });
             }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        private async Task SaveFilePathToDatabase(string fileName, string folderName, string Opcode, string autoid)
        {
             string connectionString = _configurationService.GetConnectionString();

            using (var con = new SqlConnection(connectionString))
            {
                using (var cmd = new SqlCommand("SP_SaveFile", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@FilePath", folderName);
                    cmd.Parameters.AddWithValue("@Opcode", Opcode);
                    cmd.Parameters.AddWithValue("@Autoid", autoid);
                    try
                    {
                        con.Open();
                        await cmd.ExecuteNonQueryAsync();
                    }
                    catch (SqlException ex)
                    {
                        throw new Exception($"Database error: {ex.Message}");
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Unexpected error: {ex.Message}");
                    }
                }
            }
        }
     }
}
