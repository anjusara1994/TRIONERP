namespace TrionAPI.Models
{
    public class Lead
    {
        public int? Autoid { get; set; }
        public int SalesPerson { get; set; }
        public int Authority { get; set; }
        public int Source { get; set; }
        public string CompanyName { get; set; }
        public string Landline { get; set; }
        public string ContactPerson { get; set; }
        public string Designation { get; set; }
        public string MobileNumber { get; set; }
        public string EmailId { get; set; }
        public string Address { get; set; }
        public int Area { get; set; }
        public int Emirates { get; set; }
        public int Country { get; set; }
        public string SubmittedBy { get; set; }
        
        public string CreatedOn { get; set; }
        public string Opcode { get; set; }

        public string? TRNNo { get; set; }
        public string? ContactNo { get; set; }
        public string? LicenseNo { get; set; }
        public string? SignatoryTitle { get; set; }
        public string? SignatoryName { get; set; }
        public string? SignatoryDesignation { get; set; }
        public string? SignatoryContactNo { get; set; }
        public string? SignatoryEmail { get; set; }

        public string? ConcernpersonTitle { get; set; }
        public string? ConcernpersonName { get; set; }
        public string? ConcernpersonDesignation { get; set; }
        public string? ConcernpersonContactNo { get; set; }
        public string? ConcernpersonEmail { get; set; }
        public string? AddUnitNo { get; set; }
        public string? AddFloor { get; set; }
        public string? AddTower { get; set; }
        public string? ClientID { get; set; }
        public string? AddArea { get; set; }
        public string? AddEmirates { get; set; }
        public string? AddCountry { get; set; }


        public string? SalesPersonName { get; set; }
        public string? SalesPersonMob { get; set; }
        public string? SalesPersonDesignation { get; set; }
        public string? SalesPersonEmail { get; set; }

        public string? SigningPersonName { get; set; }
        public string? SigningPersonMob { get; set; }
        public string? SigningPersonDesignation { get; set; }
        public string? SigningPersonEmail { get; set; }
        public string? SigningPersonSignature { get; set; }

    }

}
