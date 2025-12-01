using System.Diagnostics;
using System.Management;

namespace SystemAnalyzer.Core;

/// <summary>
/// Lớp thu thập thông tin hệ thống (CPU và RAM)
/// </summary>
public class SystemInfo
{
    #region CPU Information

    /// <summary>
    /// Lấy tên CPU từ WMI (Windows Management Instrumentation)
    /// </summary>
    public static string GetCpuName()
    {
        try
        {
            // Tạo query WMI để lấy thông tin từ Win32_Processor
            using var searcher = new ManagementObjectSearcher("SELECT Name FROM Win32_Processor");
            
            foreach (ManagementObject obj in searcher.Get())
            {
                // Lấy thuộc tính Name và xóa khoảng trắng thừa
                return obj["Name"]?.ToString()?.Trim() ?? "Unknown CPU";
            }
        }
        catch (Exception ex)
        {
            return $"Error: {ex.Message}";
        }

        return "Unknown CPU";
    }

    /// <summary>
    /// Lấy số lượng core vật lý của CPU
    /// </summary>
    public static int GetPhysicalCores()
    {
        try
        {
            // Query WMI để lấy NumberOfCores
            using var searcher = new ManagementObjectSearcher("SELECT NumberOfCores FROM Win32_Processor");
            
            foreach (ManagementObject obj in searcher.Get())
            {
                return Convert.ToInt32(obj["NumberOfCores"]);
            }
        }
        catch
        {
            // Fallback: sử dụng Environment
            return Environment.ProcessorCount / 2; // Ước lượng
        }

        return 0;
    }

    /// <summary>
    /// Lấy số lượng logical processors (bao gồm hyper-threading)
    /// </summary>
    public static int GetLogicalProcessors()
    {
        try
        {
            // Query WMI để lấy NumberOfLogicalProcessors
            using var searcher = new ManagementObjectSearcher("SELECT NumberOfLogicalProcessors FROM Win32_Processor");
            
            foreach (ManagementObject obj in searcher.Get())
            {
                return Convert.ToInt32(obj["NumberOfLogicalProcessors"]);
            }
        }
        catch
        {
            // Fallback: sử dụng Environment.ProcessorCount
            return Environment.ProcessorCount;
        }

        return Environment.ProcessorCount;
    }

    /// <summary>
    /// Lấy tần số CPU tối đa (MHz) từ WMI
    /// </summary>
    public static int GetMaxCpuFrequency()
    {
        try
        {
            // Query để lấy MaxClockSpeed từ Win32_Processor
            using var searcher = new ManagementObjectSearcher("SELECT MaxClockSpeed FROM Win32_Processor");
            
            foreach (ManagementObject obj in searcher.Get())
            {
                return Convert.ToInt32(obj["MaxClockSpeed"]);
            }
        }
        catch
        {
            return 0;
        }

        return 0;
    }

    /// <summary>
    /// Lấy tần số CPU hiện tại (MHz) sử dụng Performance Counter
    /// </summary>
    public static int GetCurrentCpuFrequency()
    {
        try
        {
            // Sử dụng PerformanceCounter để lấy tần số hiện tại
            using var counter = new PerformanceCounter("Processor Information", "Processor Frequency", "_Total");
            
            // Đọc giá trị đầu tiên (có thể cần sample)
            counter.NextValue();
            Thread.Sleep(100); // Chờ một chút để có sample chính xác
            
            return (int)counter.NextValue();
        }
        catch
        {
            // Fallback: trả về max frequency nếu không đọc được current
            return GetMaxCpuFrequency();
        }
    }

    #endregion

    #region Memory Information

    /// <summary>
    /// Lấy tổng dung lượng RAM (GB)
    /// </summary>
    public static double GetTotalMemoryGB()
    {
        try
        {
            // Query WMI để lấy tổng RAM vật lý
            using var searcher = new ManagementObjectSearcher("SELECT TotalPhysicalMemory FROM Win32_ComputerSystem");
            
            foreach (ManagementObject obj in searcher.Get())
            {
                // Convert từ bytes sang GB
                ulong totalBytes = Convert.ToUInt64(obj["TotalPhysicalMemory"]);
                return Math.Round(totalBytes / (1024.0 * 1024.0 * 1024.0), 2);
            }
        }
        catch
        {
            return 0;
        }

        return 0;
    }

    /// <summary>
    /// Lấy dung lượng RAM khả dụng (GB)
    /// </summary>
    public static double GetAvailableMemoryGB()
    {
        try
        {
            // Sử dụng PerformanceCounter để lấy RAM available
            using var counter = new PerformanceCounter("Memory", "Available MBytes");
            
            // Đọc giá trị và convert sang GB
            float availableMB = counter.NextValue();
            return Math.Round(availableMB / 1024.0, 2);
        }
        catch
        {
            return 0;
        }
    }

    /// <summary>
    /// Lấy dung lượng RAM đang sử dụng (GB)
    /// Tính bằng: Total - Available
    /// </summary>
    public static double GetUsedMemoryGB()
    {
        double total = GetTotalMemoryGB();
        double available = GetAvailableMemoryGB();
        return Math.Round(total - available, 2);
    }

    /// <summary>
    /// Lấy phần trăm RAM đang sử dụng
    /// </summary>
    public static double GetMemoryUsagePercentage()
    {
        double total = GetTotalMemoryGB();
        if (total == 0) return 0;
        
        double used = GetUsedMemoryGB();
        return Math.Round((used / total) * 100.0, 1);
    }

    #endregion

    #region Utility Methods

    /// <summary>
    /// Lấy tất cả thông tin hệ thống dưới dạng dictionary
    /// </summary>
    public static Dictionary<string, object> GetAllSystemInfo()
    {
        return new Dictionary<string, object>
        {
            { "CpuName", GetCpuName() },
            { "PhysicalCores", GetPhysicalCores() },
            { "LogicalProcessors", GetLogicalProcessors() },
            { "MaxCpuFrequency", GetMaxCpuFrequency() },
            { "CurrentCpuFrequency", GetCurrentCpuFrequency() },
            { "TotalMemoryGB", GetTotalMemoryGB() },
            { "AvailableMemoryGB", GetAvailableMemoryGB() },
            { "UsedMemoryGB", GetUsedMemoryGB() },
            { "MemoryUsagePercentage", GetMemoryUsagePercentage() }
        };
    }

    #endregion
}
