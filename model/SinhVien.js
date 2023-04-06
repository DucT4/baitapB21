function SinhVien() {
    this.taiKhoan = '';
    this.hoTen = '';
    this.email = '';
    this.matKhau = '';
    this.ngayLam = '';
    this.luongCoBan = 0;
    this.chucVu = '';
    this.soGioLam = 0;
    this.xepLoai = function () {
        var loai = '';
        if (this.soGioLam >= 192) {
            loai = 'Xuât sắc'
        } else if (this.soGioLam >= 176) {
            loai = 'Giỏi'
        } else if (this.soGioLam >= 160) {
            loai = 'Khá'
        } else if (this.soGioLam < 160) {
            loai = 'Trung Bình'
        }
        return loai;
    }
    this.heSoLuong = 0;
    this.tongLuong = function () {
        var luong=0;
        luong = this.luongCoBan * this.soGioLam * this.heSoLuong;
        return luong;
    }
}
