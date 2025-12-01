using SystemAnalyzer.Core;

namespace SystemAnalyzer.WinForms;

/// <summary>
/// Main Form - Giao diện WinForms để hiển thị thông tin hệ thống
/// </summary>
public partial class MainForm : Form
{
    // Timer để cập nhật thông tin theo thời gian thực
    private System.Windows.Forms.Timer? updateTimer;

    public MainForm()
    {
        InitializeComponent();
        InitializeTimer();
        
        // Load thông tin lần đầu
        UpdateSystemInfo();
    }

    /// <summary>
    /// Khởi tạo Timer để cập nhật thông tin mỗi giây
    /// </summary>
    private void InitializeTimer()
    {
        updateTimer = new System.Windows.Forms.Timer();
        updateTimer.Interval = 1000; // 1 giây
        updateTimer.Tick += (s, e) => UpdateSystemInfo();
        updateTimer.Start();
    }

    /// <summary>
    /// Cập nhật toàn bộ thông tin hệ thống
    /// </summary>
    private void UpdateSystemInfo()
    {
        try
        {
            // Cập nhật thông tin CPU
            UpdateCpuInfo();
            
            // Cập nhật thông tin RAM
            UpdateMemoryInfo();
            
            // Cập nhật thời gian
            lblLastUpdate.Text = $"Cập nhật lúc: {DateTime.Now:HH:mm:ss}";
        }
        catch (Exception ex)
        {
            MessageBox.Show($"Lỗi khi cập nhật thông tin: {ex.Message}", 
                "Lỗi", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }

    /// <summary>
    /// Cập nhật thông tin CPU
    /// </summary>
    private void UpdateCpuInfo()
    {
        lblCpuName.Text = SystemInfo.GetCpuName();
        lblCores.Text = $"{SystemInfo.GetPhysicalCores()} cores";
        lblLogicalProcessors.Text = $"{SystemInfo.GetLogicalProcessors()} logical";
        
        int currentFreq = SystemInfo.GetCurrentCpuFrequency();
        int maxFreq = SystemInfo.GetMaxCpuFrequency();
        
        lblCurrentFreq.Text = $"{currentFreq} MHz";
        lblMaxFreq.Text = $"{maxFreq} MHz";
        
        // Cập nhật màu cho frequency dựa trên % của max
        if (maxFreq > 0)
        {
            double percentage = (double)currentFreq / maxFreq * 100;
            lblCurrentFreq.ForeColor = percentage > 80 ? Color.Red : 
                                       percentage > 50 ? Color.Orange : Color.Green;
        }
    }

    /// <summary>
    /// Cập nhật thông tin RAM
    /// </summary>
    private void UpdateMemoryInfo()
    {
        double totalMemory = SystemInfo.GetTotalMemoryGB();
        double usedMemory = SystemInfo.GetUsedMemoryGB();
        double availableMemory = SystemInfo.GetAvailableMemoryGB();
        double usagePercentage = SystemInfo.GetMemoryUsagePercentage();

        lblTotalMemory.Text = $"{totalMemory:F2} GB";
        lblUsedMemory.Text = $"{usedMemory:F2} GB";
        lblAvailableMemory.Text = $"{availableMemory:F2} GB";
        lblMemoryPercentage.Text = $"{usagePercentage:F1}%";

        // Cập nhật ProgressBar
        progressBarMemory.Value = Math.Min((int)usagePercentage, 100);

        // Đổi màu dựa trên mức sử dụng
        if (usagePercentage < 50)
        {
            progressBarMemory.ForeColor = Color.Green;
            lblMemoryPercentage.ForeColor = Color.Green;
        }
        else if (usagePercentage < 75)
        {
            progressBarMemory.ForeColor = Color.Orange;
            lblMemoryPercentage.ForeColor = Color.Orange;
        }
        else
        {
            progressBarMemory.ForeColor = Color.Red;
            lblMemoryPercentage.ForeColor = Color.Red;
        }
    }

    /// <summary>
    /// Xử lý sự kiện khi click nút Refresh
    /// </summary>
    private void btnRefresh_Click(object sender, EventArgs e)
    {
        UpdateSystemInfo();
    }

    /// <summary>
    /// Xử lý sự kiện khi click nút Close
    /// </summary>
    private void btnClose_Click(object sender, EventArgs e)
    {
        updateTimer?.Stop();
        updateTimer?.Dispose();
        Close();
    }

    /// <summary>
    /// Xử lý sự kiện khi Form đóng
    /// </summary>
    protected override void OnFormClosing(FormClosingEventArgs e)
    {
        updateTimer?.Stop();
        updateTimer?.Dispose();
        base.OnFormClosing(e);
    }
}
