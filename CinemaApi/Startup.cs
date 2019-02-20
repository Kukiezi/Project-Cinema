using System;
using System.Text;
using CinemaApi.Models;
using Dna;
using Dna.AspNet;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace CinemaApi
{
    public class Startup
    {
       
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for 
                // non-essential cookies is needed for a given request
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });
            //services.AddDbContext<CinemaDBContext>(options =>
            //    options.UseSqlServer(
            //        Configuration.GetConnectionString("DefaultConnection")));
            services.AddDbContext<CinemaDBContext>(options =>
                options.UseSqlServer(Framework.Construction.Configuration.GetConnectionString("DefaultConnection")));


            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<CinemaDBContext>()
                .AddDefaultTokenProviders();

            //services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme);

            services.AddAuthentication().
                AddJwtBearer(options =>
                {
                    // Set validation parameters
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        // Validate issuer
                        ValidateIssuer = true,
                        // Validate audience
                        ValidateAudience = true,
                        // Validate expiration
                        ValidateLifetime = true,
                        // Validate signature
                        ValidateIssuerSigningKey = true,

                        // Set issuer
                        ValidIssuer = Framework.Construction.Configuration["Jwt:Issuer"],
                        // Set audience
                        ValidAudience = Framework.Construction.Configuration["Jwt:Audience"],

                        // Set signing key
                        IssuerSigningKey = new SymmetricSecurityKey(
                            // Get our secret key from configuration
                            Encoding.UTF8.GetBytes(Framework.Construction.Configuration["Jwt:SecretKey"])),
                    };
                });

            // Change password policy
            services.Configure<IdentityOptions>(options =>
            {
                // Make really weak passwords possible
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 5;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;

                // Make sure users have unique emails
                options.User.RequireUniqueEmail = true;
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IServiceProvider serviceProvider)
        {


            // Use Dna Framework
            app.UseDnaFramework();

            // Setup Identity
            app.UseAuthentication();


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            //app.UseCors("AllowSpecificOrigin");
            app.UseCors(builder =>
                builder.WithOrigins("http://localhost:3000", "https://www.kino-studyjne.pl").AllowAnyMethod().AllowAnyHeader());
            app.UseHttpsRedirection();
            // Force non-essential cookies to only store
            // if the user has consented
            app.UseCookiePolicy();

            // Serve static files
            app.UseStaticFiles();
            app.UseMvc();
            serviceProvider.GetService<CinemaDBContext>().Database.EnsureCreated();
        }
    }
}
