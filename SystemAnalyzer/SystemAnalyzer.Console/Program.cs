using SystemAnalyzer.Core;

namespace SystemAnalyzer.ConsoleApp;

/// <summary>
/// Console Application - Hiển thị thông tin CPU và RAM
/// </summary>
class Program
{
    static void Main(string[] args)
    {
        // Thiết lập màu sắc cho console
        Console.OutputEncoding = System.Text.Encoding.UTF8;
        
        // Vòng lặp chính của ứng dụng
        bool running = true;
        while (running)
        {
            Console.Clear();
            DisplaySystemInfo();
            
            Console.WriteLine("\n" + new string('═', 50));
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("Nhấn [R] để làm mới | [Q] để thoát");
            Console.ResetColor();
            Console.Write("Lựa chọn của bạn: ");
            
            var key = Console.ReadKey(true);
            if (key.Key == ConsoleKey.Q)
            {
                running = false;
            }
        }
        
        Console.Clear();
        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine("Cảm ơn bạn đã sử dụng System Analyzer!");
        Console.ResetColor();
    }

    /// <summary>
    /// Hiển thị toàn bộ thông tin hệ thống
    /// </summary>
    static void DisplaySystemInfo()
    {
        // Header
        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine(new string('═', 50));
        Console.WriteLine("     SYSTEM ANALYZER - THÔNG TIN HỆ THỐNG");
        Console.WriteLine(new string('═', 50));
        Console.ResetColor();
        Console.WriteLine();

        // Hiển thị thông tin CPU
        DisplayCpuInfo();
        Console.WriteLine();

        // Hiển thị thông tin RAM
        DisplayMemoryInfo();
    }

    /// <summary>
    /// Hiển thị thông tin CPU
    /// </summary>
    static void DisplayCpuInfo()
    {
        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine("┌─ THÔNG TIN CPU ─────────────────────────────┐");
        Console.ResetColor();

        try
        {
            // Lấy thông tin CPU
            string cpuName = SystemInfo.GetCpuName();
            int physicalCores = SystemInfo.GetPhysicalCores();
            int logicalProcessors = SystemInfo.GetLogicalProcessors();
            int maxFrequency = SystemInfo.GetMaxCpuFrequency();
            int currentFrequency = SystemInfo.GetCurrentCpuFrequency();

            // Hiển thị từng thông tin
            Console.WriteLine($"│ Tên CPU: {cpuName}");
            Console.Write("│ Physical Cores: ");
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.Write(physicalCores);
            Console.ResetColor();
            Console.Write(" | Logical Processors: ");
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine(logicalProcessors);
            Console.ResetColor();

            Console.Write("│ Tần số hiện tại: ");
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.Write($"{currentFrequency} MHz");
            Console.ResetColor();
            Console.Write(" | Tần số tối đa: ");
            Console.ForegroundColor = ConsoleColor.Magenta;
            Console.WriteLine($"{maxFrequency} MHz");
            Console.ResetColor();
        }
        catch (Exception ex)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"│ Lỗi: {ex.Message}");
            Console.ResetColor();
        }

        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine("└─────────────────────────────────────────────┘");
        Console.ResetColor();
    }

    /// <summary>
    /// Hiển thị thông tin RAM
    /// </summary>
    static void DisplayMemoryInfo()
    {
        Console.ForegroundColor = ConsoleColor.Blue;
        Console.WriteLine("┌─ THÔNG TIN BỘ NHỚ ──────────────────────────┐");
        Console.ResetColor();

        try
        {
            // Lấy thông tin RAM
            double totalMemory = SystemInfo.GetTotalMemoryGB();
            double usedMemory = SystemInfo.GetUsedMemoryGB();
            double availableMemory = SystemInfo.GetAvailableMemoryGB();
            double usagePercentage = SystemInfo.GetMemoryUsagePercentage();

            // Hiển thị thông tin RAM
            Console.Write("│ Tổng RAM: ");
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine($"{totalMemory:F2} GB");
            Console.ResetColor();

            Console.Write("│ Đang sử dụng: ");
            Console.ForegroundColor = GetMemoryColor(usagePercentage);
            Console.Write($"{usedMemory:F2} GB");
            Console.ResetColor();
            Console.Write($" ({usagePercentage:F1}%)");
            Console.WriteLine();

            Console.Write("│ Còn trống: ");
            Console.ForegroundColor = ConsoleColor.Green;
            Console.Write($"{availableMemory:F2} GB");
            Console.ResetColor();
            Console.WriteLine($" ({(100 - usagePercentage):F1}%)");

            // Hiển thị thanh progress bar
            Console.Write("│ ");
            DisplayProgressBar(usagePercentage);
        }
        catch (Exception ex)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"│ Lỗi: {ex.Message}");
            Console.ResetColor();
        }

        Console.ForegroundColor = ConsoleColor.Blue;
        Console.WriteLine("└─────────────────────────────────────────────┘");
        Console.ResetColor();
    }

    /// <summary>
    /// Hiển thị thanh progress bar cho RAM usage
    /// </summary>
    static void DisplayProgressBar(double percentage)
    {
        int totalBars = 40; // Tổng số ký tự trong thanh
        int filledBars = (int)((percentage / 100.0) * totalBars);

        Console.ForegroundColor = GetMemoryColor(percentage);
        Console.Write("[");
        
        for (int i = 0; i < totalBars; i++)
        {
            if (i < filledBars)
                Console.Write("█");
            else
                Console.Write("░");
        }
        
        Console.Write($"] {percentage:F1}%");
        Console.ResetColor();
        Console.WriteLine();
    }

    /// <summary>
    /// Lấy màu sắc dựa trên mức sử dụng RAM
    /// </summary>
    static ConsoleColor GetMemoryColor(double percentage)
    {
        if (percentage < 50)
            return ConsoleColor.Green;      // Xanh lá: < 50%
        else if (percentage < 75)
            return ConsoleColor.Yellow;     // Vàng: 50-75%
        else if (percentage < 90)
            return ConsoleColor.DarkYellow; // Vàng đậm: 75-90%
        else
            return ConsoleColor.Red;        // Đỏ: >= 90%
    }
}
