namespace SystemAnalyzer.WinForms;

partial class MainForm
{
    /// <summary>
    /// Required designer variable.
    /// </summary>
    private System.ComponentModel.IContainer components = null;

    /// <summary>
    /// Clean up any resources being used.
    /// </summary>
    protected override void Dispose(bool disposing)
    {
        if (disposing && (components != null))
        {
            components.Dispose();
        }
        base.Dispose(disposing);
    }

    #region Windows Form Designer generated code

    // CPU Information Labels
    private Label lblCpuTitle;
    private Label lblCpuNameLabel;
    private Label lblCpuName;
    private Label lblCoresLabel;
    private Label lblCores;
    private Label lblLogicalProcessorsLabel;
    private Label lblLogicalProcessors;
    private Label lblCurrentFreqLabel;
    private Label lblCurrentFreq;
    private Label lblMaxFreqLabel;
    private Label lblMaxFreq;

    // Memory Information Labels
    private Label lblMemoryTitle;
    private Label lblTotalMemoryLabel;
    private Label lblTotalMemory;
    private Label lblUsedMemoryLabel;
    private Label lblUsedMemory;
    private Label lblAvailableMemoryLabel;
    private Label lblAvailableMemory;
    private Label lblMemoryPercentage;
    private ProgressBar progressBarMemory;

    // GroupBoxes
    private GroupBox groupBoxCpu;
    private GroupBox groupBoxMemory;

    // Buttons
    private Button btnRefresh;
    private Button btnClose;
    private Label lblLastUpdate;

    /// <summary>
    /// Required method for Designer support.
    /// </summary>
    private void InitializeComponent()
    {
        this.groupBoxCpu = new GroupBox();
        this.lblCpuTitle = new Label();
        this.lblCpuNameLabel = new Label();
        this.lblCpuName = new Label();
        this.lblCoresLabel = new Label();
        this.lblCores = new Label();
        this.lblLogicalProcessorsLabel = new Label();
        this.lblLogicalProcessors = new Label();
        this.lblCurrentFreqLabel = new Label();
        this.lblCurrentFreq = new Label();
        this.lblMaxFreqLabel = new Label();
        this.lblMaxFreq = new Label();

        this.groupBoxMemory = new GroupBox();
        this.lblMemoryTitle = new Label();
        this.lblTotalMemoryLabel = new Label();
        this.lblTotalMemory = new Label();
        this.lblUsedMemoryLabel = new Label();
        this.lblUsedMemory = new Label();
        this.lblAvailableMemoryLabel = new Label();
        this.lblAvailableMemory = new Label();
        this.lblMemoryPercentage = new Label();
        this.progressBarMemory = new ProgressBar();

        this.btnRefresh = new Button();
        this.btnClose = new Button();
        this.lblLastUpdate = new Label();

        this.SuspendLayout();

        // 
        // Form
        // 
        this.Text = "System Analyzer - Monitor CPU & RAM";
        this.ClientSize = new Size(600, 500);
        this.FormBorderStyle = FormBorderStyle.FixedDialog;
        this.MaximizeBox = false;
        this.StartPosition = FormStartPosition.CenterScreen;
        this.BackColor = Color.WhiteSmoke;

        // 
        // groupBoxCpu
        // 
        this.groupBoxCpu.Location = new Point(20, 20);
        this.groupBoxCpu.Size = new Size(560, 200);
        this.groupBoxCpu.Text = "⚙️ THÔNG TIN CPU";
        this.groupBoxCpu.Font = new Font("Segoe UI", 10F, FontStyle.Bold);
        this.groupBoxCpu.ForeColor = Color.DarkBlue;

        // CPU Name
        this.lblCpuNameLabel.Location = new Point(15, 30);
        this.lblCpuNameLabel.Size = new Size(100, 25);
        this.lblCpuNameLabel.Text = "Tên CPU:";
        this.lblCpuNameLabel.Font = new Font("Segoe UI", 9F, FontStyle.Bold);
        this.lblCpuNameLabel.ForeColor = Color.Black;

        this.lblCpuName.Location = new Point(120, 30);
        this.lblCpuName.Size = new Size(420, 25);
        this.lblCpuName.Text = "Loading...";
        this.lblCpuName.Font = new Font("Segoe UI", 9F);
        this.lblCpuName.ForeColor = Color.DarkSlateGray;

        // Cores
        this.lblCoresLabel.Location = new Point(15, 65);
        this.lblCoresLabel.Size = new Size(150, 25);
        this.lblCoresLabel.Text = "Physical Cores:";
        this.lblCoresLabel.Font = new Font("Segoe UI", 9F, FontStyle.Bold);

        this.lblCores.Location = new Point(165, 65);
        this.lblCores.Size = new Size(100, 25);
        this.lblCores.Text = "0";
        this.lblCores.Font = new Font("Segoe UI", 9F);
        this.lblCores.ForeColor = Color.DarkGreen;

        // Logical Processors
        this.lblLogicalProcessorsLabel.Location = new Point(280, 65);
        this.lblLogicalProcessorsLabel.Size = new Size(150, 25);
        this.lblLogicalProcessorsLabel.Text = "Logical Processors:";
        this.lblLogicalProcessorsLabel.Font = new Font("Segoe UI", 9F, FontStyle.Bold);

        this.lblLogicalProcessors.Location = new Point(435, 65);
        this.lblLogicalProcessors.Size = new Size(100, 25);
        this.lblLogicalProcessors.Text = "0";
        this.lblLogicalProcessors.Font = new Font("Segoe UI", 9F);
        this.lblLogicalProcessors.ForeColor = Color.DarkGreen;

        // Current Frequency
        this.lblCurrentFreqLabel.Location = new Point(15, 100);
        this.lblCurrentFreqLabel.Size = new Size(150, 25);
        this.lblCurrentFreqLabel.Text = "Tần số hiện tại:";
        this.lblCurrentFreqLabel.Font = new Font("Segoe UI", 9F, FontStyle.Bold);

        this.lblCurrentFreq.Location = new Point(165, 100);
        this.lblCurrentFreq.Size = new Size(100, 25);
        this.lblCurrentFreq.Text = "0 MHz";
        this.lblCurrentFreq.Font = new Font("Segoe UI", 9F, FontStyle.Bold);
        this.lblCurrentFreq.ForeColor = Color.Blue;

        // Max Frequency
        this.lblMaxFreqLabel.Location = new Point(280, 100);
        this.lblMaxFreqLabel.Size = new Size(150, 25);
        this.lblMaxFreqLabel.Text = "Tần số tối đa:";
        this.lblMaxFreqLabel.Font = new Font("Segoe UI", 9F, FontStyle.Bold);

        this.lblMaxFreq.Location = new Point(435, 100);
        this.lblMaxFreq.Size = new Size(100, 25);
        this.lblMaxFreq.Text = "0 MHz";
        this.lblMaxFreq.Font = new Font("Segoe UI", 9F);
        this.lblMaxFreq.ForeColor = Color.Purple;

        // Add CPU controls to groupBox
        this.groupBoxCpu.Controls.AddRange(new Control[] {
            lblCpuNameLabel, lblCpuName,
            lblCoresLabel, lblCores,
            lblLogicalProcessorsLabel, lblLogicalProcessors,
            lblCurrentFreqLabel, lblCurrentFreq,
            lblMaxFreqLabel, lblMaxFreq
        });

        // 
        // groupBoxMemory
        // 
        this.groupBoxMemory.Location = new Point(20, 240);
        this.groupBoxMemory.Size = new Size(560, 180);
        this.groupBoxMemory.Text = "💾 THÔNG TIN BỘ NHỚ RAM";
        this.groupBoxMemory.Font = new Font("Segoe UI", 10F, FontStyle.Bold);
        this.groupBoxMemory.ForeColor = Color.DarkGreen;

        // Total Memory
        this.lblTotalMemoryLabel.Location = new Point(15, 30);
        this.lblTotalMemoryLabel.Size = new Size(120, 25);
        this.lblTotalMemoryLabel.Text = "Tổng RAM:";
        this.lblTotalMemoryLabel.Font = new Font("Segoe UI", 9F, FontStyle.Bold);

        this.lblTotalMemory.Location = new Point(135, 30);
        this.lblTotalMemory.Size = new Size(100, 25);
        this.lblTotalMemory.Text = "0 GB";
        this.lblTotalMemory.Font = new Font("Segoe UI", 9F, FontStyle.Bold);
        this.lblTotalMemory.ForeColor = Color.Black;

        // Used Memory
        this.lblUsedMemoryLabel.Location = new Point(15, 60);
        this.lblUsedMemoryLabel.Size = new Size(120, 25);
        this.lblUsedMemoryLabel.Text = "Đang dùng:";
        this.lblUsedMemoryLabel.Font = new Font("Segoe UI", 9F, FontStyle.Bold);

        this.lblUsedMemory.Location = new Point(135, 60);
        this.lblUsedMemory.Size = new Size(100, 25);
        this.lblUsedMemory.Text = "0 GB";
        this.lblUsedMemory.Font = new Font("Segoe UI", 9F);
        this.lblUsedMemory.ForeColor = Color.OrangeRed;

        // Available Memory
        this.lblAvailableMemoryLabel.Location = new Point(15, 90);
        this.lblAvailableMemoryLabel.Size = new Size(120, 25);
        this.lblAvailableMemoryLabel.Text = "Còn trống:";
        this.lblAvailableMemoryLabel.Font = new Font("Segoe UI", 9F, FontStyle.Bold);

        this.lblAvailableMemory.Location = new Point(135, 90);
        this.lblAvailableMemory.Size = new Size(100, 25);
        this.lblAvailableMemory.Text = "0 GB";
        this.lblAvailableMemory.Font = new Font("Segoe UI", 9F);
        this.lblAvailableMemory.ForeColor = Color.Green;

        // Progress Bar
        this.progressBarMemory.Location = new Point(15, 125);
        this.progressBarMemory.Size = new Size(440, 30);
        this.progressBarMemory.Minimum = 0;
        this.progressBarMemory.Maximum = 100;
        this.progressBarMemory.Value = 0;

        // Memory Percentage
        this.lblMemoryPercentage.Location = new Point(465, 125);
        this.lblMemoryPercentage.Size = new Size(80, 30);
        this.lblMemoryPercentage.Text = "0%";
        this.lblMemoryPercentage.Font = new Font("Segoe UI", 11F, FontStyle.Bold);
        this.lblMemoryPercentage.ForeColor = Color.Green;
        this.lblMemoryPercentage.TextAlign = ContentAlignment.MiddleCenter;

        // Add Memory controls to groupBox
        this.groupBoxMemory.Controls.AddRange(new Control[] {
            lblTotalMemoryLabel, lblTotalMemory,
            lblUsedMemoryLabel, lblUsedMemory,
            lblAvailableMemoryLabel, lblAvailableMemory,
            progressBarMemory, lblMemoryPercentage
        });

        // 
        // btnRefresh
        // 
        this.btnRefresh.Location = new Point(300, 440);
        this.btnRefresh.Size = new Size(130, 35);
        this.btnRefresh.Text = "🔄 Làm mới";
        this.btnRefresh.Font = new Font("Segoe UI", 9F, FontStyle.Bold);
        this.btnRefresh.BackColor = Color.LightBlue;
        this.btnRefresh.FlatStyle = FlatStyle.Flat;
        this.btnRefresh.Cursor = Cursors.Hand;
        this.btnRefresh.Click += btnRefresh_Click;

        // 
        // btnClose
        // 
        this.btnClose.Location = new Point(450, 440);
        this.btnClose.Size = new Size(130, 35);
        this.btnClose.Text = "❌ Đóng";
        this.btnClose.Font = new Font("Segoe UI", 9F, FontStyle.Bold);
        this.btnClose.BackColor = Color.LightCoral;
        this.btnClose.FlatStyle = FlatStyle.Flat;
        this.btnClose.Cursor = Cursors.Hand;
        this.btnClose.Click += btnClose_Click;

        // 
        // lblLastUpdate
        // 
        this.lblLastUpdate.Location = new Point(20, 445);
        this.lblLastUpdate.Size = new Size(270, 25);
        this.lblLastUpdate.Text = "Cập nhật lúc: --:--:--";
        this.lblLastUpdate.Font = new Font("Segoe UI", 8F, FontStyle.Italic);
        this.lblLastUpdate.ForeColor = Color.Gray;

        // 
        // Add all controls to Form
        // 
        this.Controls.Add(groupBoxCpu);
        this.Controls.Add(groupBoxMemory);
        this.Controls.Add(btnRefresh);
        this.Controls.Add(btnClose);
        this.Controls.Add(lblLastUpdate);

        this.ResumeLayout(false);
    }

    #endregion
}
