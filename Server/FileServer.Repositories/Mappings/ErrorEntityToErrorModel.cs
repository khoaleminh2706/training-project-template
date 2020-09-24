using AutoMapper;
using FileServer.Repositories.Entities;
using FileServer.Shared.Models;

namespace FileServer.Repositories.Mappings
{
    public class ErrorEntityToErrorModel: Profile
    {
        public ErrorEntityToErrorModel()
        {
            CreateMap<Error, ErrorModel>().ReverseMap();
        }
    }
}
