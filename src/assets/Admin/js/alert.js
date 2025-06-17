import Swal from "sweetalert2";
// Thông báo đơn giản
export function showAlert(title = 'Thông báo', text = '', icon = 'info') {
  return Swal.fire({ title, text, icon });
}

//Thông báo thành công
export function showSuccess(
  text = 'Thành công!',
  confirmButtonText = 'Xác nhận',
) {
  return Swal.fire({
    icon: 'success',
    title: 'Thành công',
    text,
    confirmButtonText,
    customClass: {
      confirmButton: 'btn bg-gradient-primary text-white'
    },
  });
}

//Thông báo lỗi
export function showError(text = 'Thất bại!', confirmButtonText = 'Xác nhận') {
  return Swal.fire({
    icon: 'error',
    title: 'Lỗi',
    text,
    confirmButtonText,
    confirmButtonText,
    customClass: {
      confirmButton: 'btn bg-gradient-primary text-white'
    }
  });
}

//Xác nhận hành động xóa
export function showConfirm({
  title = 'Bạn chắc chứ ?',
  text = 'Hành động này không thể hoàn tác!',
  cancelButtonText = 'Huỷ',
  confirmButtonText = 'Đồng ý',
  confirmButtonClass = 'btn btn-primary',
  cancelButtonClass = 'btn btn-secondary',
  useCustomClass = true
}) {
 return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText,
    confirmButtonText,
    reverseButtons: false,
    confirmButtonColor: useCustomClass ? undefined : '#3085d6',
    cancelButtonColor: useCustomClass ? undefined : '#d33',
    customClass: useCustomClass
      ? {
          confirmButton: confirmButtonClass,
          cancelButton: cancelButtonClass,
        }
      : {},
    buttonsStyling: useCustomClass ? false : true
  });
}

// Nhập input
export function showInput(title = 'Nhập thông tin', placeholder = '') {
  return Swal.fire({
    title,
    input: 'text',
    inputPlaceholder: placeholder,
    showCancelButton: true,
    confirmButtonText: 'Gửi',

  });
}