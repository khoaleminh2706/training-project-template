﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FileServer.Models;
using Microsoft.AspNetCore.Http;

namespace FileServer.Services
{
    public interface IFileService
    {
        Task<List<FileViewModel>> GetAll();
        Task<FileViewModel> Find(Guid id);
        Task<FileViewModel> SaveFile(IFormFile inputFile, FileCreateInput input);
        Task<FileViewModel> Delete(string id);
    }
}