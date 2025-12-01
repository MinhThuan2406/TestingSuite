# System Analyzer - Ứng dụng Giám sát CPU & RAM

Ứng dụng C# (.NET 8.0) hoàn chỉnh để giám sát và hiển thị thông tin hệ thống bao gồm CPU và RAM với cả giao diện Console và Windows Forms.

## 🎯 Tính năng

### Thông tin CPU
- ✅ Tên CPU (ví dụ: Intel Core i7-9700K)
- ✅ Số lượng Physical Cores
- ✅ Số lượng Logical Processors
- ✅ Tần số CPU hiện tại (MHz)
- ✅ Tần số CPU tối đa (MHz)

### Thông tin RAM
- ✅ Tổng dung lượng RAM (GB)
- ✅ RAM đang sử dụng (GB và %)
- ✅ RAM còn trống (GB và %)
- ✅ Thanh progress bar trực quan
- ✅ Mã màu dựa trên mức sử dụng

## 📁 Cấu trúc dự án

```
SystemAnalyzer/
├── SystemAnalyzer.Core/              # Thư viện core
│   ├── SystemInfo.cs                 # Class chính thu thập thông tin
│   └── SystemAnalyzer.Core.csproj
├── SystemAnalyzer.Console/           # Ứng dụng Console
│   ├── Program.cs
│   └── SystemAnalyzer.Console.csproj
├── SystemAnalyzer.WinForms/          # Ứng dụng Windows Forms
│   ├── Program.cs
│   ├── MainForm.cs
│   ├── MainForm.Designer.cs
│   └── SystemAnalyzer.WinForms.csproj
└── README.md
```

## 🛠️ Yêu cầu hệ thống

- **OS**: Windows 10/11
- **.NET SDK**: .NET 8.0 trở lên
- **Quyền**: Không yêu cầu quyền Administrator (chạy bình thường)

## 📦 Cài đặt và Biên dịch

### 1. Restore dependencies

```powershell
cd SystemAnalyzer
dotnet restore
```

### 2. Build toàn bộ solution

```powershell
dotnet build
```

### 3. Chạy ứng dụng Console

```powershell
dotnet run --project SystemAnalyzer.Console
```

### 4. Chạy ứng dụng WinForms

```powershell
dotnet run --project SystemAnalyzer.WinForms
```

## 🎨 Giao diện

### Console Application
- Giao diện văn bản đẹp mắt với màu sắc
- Khung viền ASCII art
- Thanh progress bar cho RAM
- Tự động làm mới khi nhấn phím R
- Màu sắc thay đổi theo mức sử dụng:
  - 🟢 Xanh: < 50%
  - 🟡 Vàng: 50-75%
  - 🟠 Cam: 75-90%
  - 🔴 Đỏ: >= 90%

### WinForms Application
- Giao diện đồ họa hiện đại
- Cập nhật real-time mỗi 1 giây
- Progress bar trực quan cho RAM
- Màu sắc động dựa trên hiệu suất
- Nút Refresh thủ công
- Hiển thị thời gian cập nhật

## 💻 Giải thích mã nguồn

### SystemAnalyzer.Core/SystemInfo.cs

Đây là thư viện chính chứa tất cả logic thu thập thông tin hệ thống.

#### 1. Thu thập thông tin CPU

```csharp
public static string GetCpuName()
{
    // Sử dụng WMI (Windows Management Instrumentation)
    // Query bảng Win32_Processor để lấy tên CPU
    using var searcher = new ManagementObjectSearcher("SELECT Name FROM Win32_Processor");
    
    foreach (ManagementObject obj in searcher.Get())
    {
        return obj["Name"]?.ToString()?.Trim() ?? "Unknown CPU";
    }
}
```

**Cách hoạt động:**
- `ManagementObjectSearcher`: Tạo query WMI
- `Win32_Processor`: Bảng chứa thông tin CPU trong Windows
- `Name`: Thuộc tính chứa tên đầy đủ của CPU

#### 2. Thu thập số cores

```csharp
public static int GetPhysicalCores()
{
    // Query NumberOfCores từ Win32_Processor
    using var searcher = new ManagementObjectSearcher(
        "SELECT NumberOfCores FROM Win32_Processor"
    );
    
    foreach (ManagementObject obj in searcher.Get())
    {
        return Convert.ToInt32(obj["NumberOfCores"]);
    }
}
```

**Phân biệt:**
- **Physical Cores**: Số lõi vật lý trên CPU
- **Logical Processors**: Bao gồm cả Hyper-Threading (VD: 8 cores = 16 threads)

#### 3. Thu thập tần số CPU

```csharp
public static int GetCurrentCpuFrequency()
{
    // Sử dụng Performance Counter
    using var counter = new PerformanceCounter(
        "Processor Information",  // Category
        "Processor Frequency",    // Counter
        "_Total"                  // Instance (tất cả cores)
    );
    
    counter.NextValue();          // Sample đầu tiên
    Thread.Sleep(100);            // Chờ để có sample chính xác
    return (int)counter.NextValue();
}
```

**Cách hoạt động:**
- `PerformanceCounter`: Đọc các counter của Windows Performance
- `NextValue()`: Lấy giá trị hiện tại
- Cần gọi 2 lần để có kết quả chính xác (sample interval)

#### 4. Thu thập thông tin RAM

```csharp
public static double GetTotalMemoryGB()
{
    // Query TotalPhysicalMemory từ Win32_ComputerSystem
    using var searcher = new ManagementObjectSearcher(
        "SELECT TotalPhysicalMemory FROM Win32_ComputerSystem"
    );
    
    foreach (ManagementObject obj in searcher.Get())
    {
        ulong totalBytes = Convert.ToUInt64(obj["TotalPhysicalMemory"]);
        // Convert bytes -> GB
        return Math.Round(totalBytes / (1024.0 * 1024.0 * 1024.0), 2);
    }
}
```

```csharp
public static double GetAvailableMemoryGB()
{
    // Sử dụng Performance Counter cho RAM available
    using var counter = new PerformanceCounter("Memory", "Available MBytes");
    
    float availableMB = counter.NextValue();
    return Math.Round(availableMB / 1024.0, 2);  // MB -> GB
}
```

**Công thức:**
- **Used RAM** = Total RAM - Available RAM
- **Usage %** = (Used RAM / Total RAM) × 100

### SystemAnalyzer.Console/Program.cs

Ứng dụng console với giao diện màu sắc và tương tác.

#### Key Features:

1. **Màu sắc động:**
```csharp
static ConsoleColor GetMemoryColor(double percentage)
{
    if (percentage < 50) return ConsoleColor.Green;
    else if (percentage < 75) return ConsoleColor.Yellow;
    else if (percentage < 90) return ConsoleColor.DarkYellow;
    else return ConsoleColor.Red;
}
```

2. **Progress Bar:**
```csharp
static void DisplayProgressBar(double percentage)
{
    int totalBars = 40;
    int filledBars = (int)((percentage / 100.0) * totalBars);
    
    for (int i = 0; i < totalBars; i++)
    {
        if (i < filledBars)
            Console.Write("█");  // Filled
        else
            Console.Write("░");  // Empty
    }
}
```

3. **Vòng lặp tương tác:**
```csharp
while (running)
{
    Console.Clear();
    DisplaySystemInfo();
    
    var key = Console.ReadKey(true);
    if (key.Key == ConsoleKey.Q)
        running = false;
}
```

### SystemAnalyzer.WinForms

Ứng dụng Windows Forms với cập nhật real-time.

#### Key Components:

1. **Timer cho cập nhật tự động:**
```csharp
private void InitializeTimer()
{
    updateTimer = new System.Windows.Forms.Timer();
    updateTimer.Interval = 1000;  // 1 giây
    updateTimer.Tick += (s, e) => UpdateSystemInfo();
    updateTimer.Start();
}
```

2. **Cập nhật UI:**
```csharp
private void UpdateMemoryInfo()
{
    double usagePercentage = SystemInfo.GetMemoryUsagePercentage();
    
    // Cập nhật progress bar
    progressBarMemory.Value = Math.Min((int)usagePercentage, 100);
    
    // Đổi màu động
    if (usagePercentage < 50)
        progressBarMemory.ForeColor = Color.Green;
    else if (usagePercentage < 75)
        progressBarMemory.ForeColor = Color.Orange;
    else
        progressBarMemory.ForeColor = Color.Red;
}
```

3. **Cleanup khi đóng:**
```csharp
protected override void OnFormClosing(FormClosingEventArgs e)
{
    updateTimer?.Stop();
    updateTimer?.Dispose();
    base.OnFormClosing(e);
}
```

## 🔧 Công nghệ sử dụng

### System.Management (WMI)
- Thu thập thông tin CPU từ bảng `Win32_Processor`
- Thu thập thông tin RAM từ bảng `Win32_ComputerSystem`
- Không yêu cầu quyền Administrator

### System.Diagnostics.PerformanceCounter
- Đọc tần số CPU real-time
- Đọc RAM available real-time
- Chính xác và cập nhật liên tục

### Windows Forms
- Giao diện đồ họa native Windows
- Timer cho real-time monitoring
- Progress bar và color coding

## 🐛 Xử lý lỗi

Tất cả các method đều có try-catch để xử lý lỗi:

```csharp
try
{
    // Thu thập thông tin
}
catch (Exception ex)
{
    return "Error: " + ex.Message;
}
```

**Lỗi thường gặp:**
1. **PerformanceCounter không hoạt động**: Cần rebuild performance counters
2. **WMI timeout**: Hệ thống quá tải hoặc WMI service không chạy

## 📊 Ví dụ Output

### Console:
```
═════════════════════════════════════════════════
     SYSTEM ANALYZER - THÔNG TIN HỆ THỐNG
═════════════════════════════════════════════════

┌─ THÔNG TIN CPU ─────────────────────────────┐
│ Tên CPU: Intel(R) Core(TM) i7-9700K CPU @ 3.60GHz
│ Physical Cores: 8 | Logical Processors: 8
│ Tần số hiện tại: 3600 MHz | Tần số tối đa: 4900 MHz
└─────────────────────────────────────────────┘

┌─ THÔNG TIN BỘ NHỚ ──────────────────────────┐
│ Tổng RAM: 16.00 GB
│ Đang sử dụng: 8.45 GB (52.8%)
│ Còn trống: 7.55 GB (47.2%)
│ [████████████████████░░░░░░░░░░░░░░░░░░░░] 52.8%
└─────────────────────────────────────────────┘
```

## 🎓 Học hỏi từ dự án

### Kiến thức đạt được:
1. **WMI (Windows Management Instrumentation)**
   - Query thông tin hệ thống Windows
   - Sử dụng ManagementObjectSearcher

2. **Performance Counters**
   - Đọc metrics real-time
   - Hiểu về sampling và intervals

3. **Windows Forms**
   - Tạo UI desktop
   - Timer và event handling
   - Dynamic UI updates

4. **Best Practices**
   - Dispose resources (`using` statements)
   - Error handling với try-catch
   - Separation of concerns (Core library riêng)

## 📝 License

Mã nguồn mở, tự do sử dụng cho mục đích học tập và thương mại.

## 👨‍💻 Tác giả

Được tạo bởi Antigravity AI cho mục đích kiểm thử và học tập.

---

**Lưu ý:** Ứng dụng này chỉ hoạt động trên Windows do sử dụng WMI và Performance Counters.
