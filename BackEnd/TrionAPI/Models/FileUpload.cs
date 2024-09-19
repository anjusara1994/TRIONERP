namespace TrionAPI.Models
{
    public class FileUpload
    {
        public string? Opcode { get; set; }
        public string? File { get; set; }
        public int Id { get; set; }
        public string? FilePath { get; set; }
        public DateTime UploadedAt { get; set; }
        public string? autoid { get; set; }
        public string? clientid { get; set; }
        public string? FileMode { get; set; }
        public string? FileUploadPage { get; set; }

        public string? FileFolder { get; set; }
        public string? SubmittedBy { get; set; }

    }
}
