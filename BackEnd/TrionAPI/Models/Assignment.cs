using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;

namespace TrionAPI.Models
{
    public class Assignment
    {
            public int? Autoid { get; set; }
            public int? ClientID { get; set; }
            public int? AssignmentId { get; set; }

            [JsonConverter(typeof(CustomDateModelBinder))]
             public DateTime? StartDate { get; set; }

            [JsonConverter(typeof(CustomDateModelBinder))]
             public DateTime? EndDate { get; set; }
            public int? PeriodType { get; set; }
            public string? Mode { get; set; }
            public decimal? ProfessionalFee { get; set; }
            public decimal? PeriodValue { get; set; }
            public decimal? TotalAmount { get; set; }
            public int? VatPercent { get; set; }
            public decimal? VatAmount { get; set; }
            public decimal? AmountIncVat { get; set; }
            public decimal? AuthorityFee { get; set; }
            public int? AdvancePercent { get; set; }
            public decimal? AdvanceAmount { get; set; }
            public int? SubmittedBy { get; set; }
        
            [JsonConverter(typeof(CustomDateModelBinder))]
            public DateTime? CreatedOn { get; set; }
            public string? Opcode { get; set; }
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
            public string? ELID { get; set; }
            public string? ELDate { get; set; }

            public string? AssignmentName { get; set; }
            public string? Period { get; set; }
            public string? ETC { get; set; }
            public string? ScopeOfWork { get; set; }
            public string? FirstPartyResponsibility { get; set; }
            public string? SecondPartyResponsibility { get; set; }
            public string? Limitations { get; set; }
            public string? Report { get; set; }
            public string? OtherMatters { get; set; }
            public string? Objectives { get; set; }
            public int? Area { get; set; }
            public int? Emirates { get; set; }
            public int? Country { get; set; }
            public string? ELFirstPartySign { get; set; }
            public string? ELSecondPartySign { get; set; }
            public string? ELFirstPartySignDate { get; set; }
            public string? ELSecondPartySignDate { get; set; }
            public string? QUOTFirstPartySign { get; set; }
            public string? QUOTSecondPartySign { get; set; }
            public string? QUOTFirstPartySignDate { get; set; }
            public string? QUOTSecondPartySignDate { get; set; }

            public int? primaryAssignerId { get; set; }
            public int? secondaryAssignerId { get; set; }
            public int? StatusId { get; set; }
            public string? Remarks { get; set; }

    }


}
