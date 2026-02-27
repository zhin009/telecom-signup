// 全局状态
const state = {
    currentStep: 1,
    selectedPlan: null,
    selectedNumber: null,
    formData: {}
};

// 号码数据
const phoneNumbers = [
    { number: '138-0013-5678', type: 'lucky', label: '吉祥号' },
    { number: '139-1234-8888', type: 'lucky', label: '吉祥号' },
    { number: '135-6789-1688', type: 'lucky', label: '吉祥号' },
    { number: '136-8888-6666', type: 'lucky', label: '吉祥号' },
    { number: '138-1234-5678', type: 'lucky', label: '吉祥号' },
    { number: '139-9999-8888', type: 'lucky', label: '吉祥号' },
    { number: '137-2468-1357', type: 'normal', label: '普通号' },
    { number: '138-3691-2580', type: 'normal', label: '普通号' },
    { number: '139-7531-9642', type: 'normal', label: '普通号' },
    { number: '135-8024-6135', type: 'normal', label: '普通号' },
    { number: '136-1357-2468', type: 'normal', label: '普通号' },
    { number: '137-9642-8024', type: 'normal', label: '普通号' },
    { number: '138-5791-3462', type: 'normal', label: '普通号' },
    { number: '139-4682-1357', type: 'normal', label: '普通号' },
    { number: '135-2468-9753', type: 'normal', label: '普通号' },
    { number: '136-8024-5791', type: 'normal', label: '普通号' }
];

// 套餐信息
const plans = {
    basic: { name: '基础套餐', price: 59 },
    standard: { name: '标准套餐', price: 99 },
    premium: { name: '尊享套餐', price: 159 }
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initNumberGrid();
    setupFormValidation();
});

// 初始化号码网格
function initNumberGrid() {
    const grid = document.getElementById('numbersGrid');
    grid.innerHTML = '';
    
    phoneNumbers.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = `number-card ${item.type}`;
        card.dataset.number = item.number;
        card.dataset.type = item.type;
        card.innerHTML = `
            <div class="number-value">${item.number}</div>
            <span class="number-type">${item.label}</span>
        `;
        card.onclick = () => selectNumber(item.number, card);
        grid.appendChild(card);
    });
}

// 过滤号码
function filterNumbers() {
    const filterType = document.getElementById('numberType').value;
    const cards = document.querySelectorAll('.number-card');
    
    cards.forEach(card => {
        if (filterType === 'all' || card.dataset.type === filterType) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// 选择号码
function selectNumber(number, card) {
    // 移除其他选中状态
    document.querySelectorAll('.number-card').forEach(c => c.classList.remove('selected'));
    
    // 添加选中状态
    card.classList.add('selected');
    state.selectedNumber = number;
    
    // 启用下一步按钮
    document.getElementById('numberNextBtn').disabled = false;
}

// 选择套餐
function selectPlan(planType) {
    state.selectedPlan = planType;
    
    // 更新 UI
    document.querySelectorAll('.plan-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    document.querySelector(`.plan-card[data-plan="${planType}"]`).classList.add('selected');
    
    // 启用下一步按钮
    document.getElementById('planNextBtn').disabled = false;
}

// 切换到下一步
function nextStep(step) {
    // 验证当前步骤
    if (!validateStep(state.currentStep)) {
        return;
    }
    
    // 保存当前步骤数据
    saveCurrentStepData();
    
    // 隐藏当前步骤
    document.getElementById(`step${state.currentStep}`).style.display = 'none';
    
    // 更新步骤状态
    state.currentStep = step;
    
    // 显示新步骤
    document.getElementById(`step${step}`).style.display = 'block';
    
    // 更新进度指示器
    updateProgressIndicator();
    
    // 如果是第 4 步，填充摘要信息
    if (step === 4) {
        fillSummary();
    }
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 返回上一步
function prevStep(step) {
    document.getElementById(`step${state.currentStep}`).style.display = 'none';
    state.currentStep = step;
    document.getElementById(`step${step}`).style.display = 'block';
    updateProgressIndicator();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 更新进度指示器
function updateProgressIndicator() {
    document.querySelectorAll('.step').forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNum === state.currentStep) {
            step.classList.add('active');
        } else if (stepNum < state.currentStep) {
            step.classList.add('completed');
        }
    });
}

// 保存当前步骤数据
function saveCurrentStepData() {
    if (state.currentStep === 1) {
        state.formData = {
            fullName: document.getElementById('fullName').value,
            idType: document.getElementById('idType').value,
            idNumber: document.getElementById('idNumber').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value
        };
    }
}

// 验证当前步骤
function validateStep(step) {
    if (step === 1) {
        const fullName = document.getElementById('fullName').value.trim();
        const idType = document.getElementById('idType').value;
        const idNumber = document.getElementById('idNumber').value.trim();
        const phone = document.getElementById('phone').value.trim();
        
        if (!fullName) {
            alert('请输入姓名');
            document.getElementById('fullName').focus();
            return false;
        }
        
        if (!idType) {
            alert('请选择证件类型');
            document.getElementById('idType').focus();
            return false;
        }
        
        if (!idNumber) {
            alert('请输入证件号码');
            document.getElementById('idNumber').focus();
            return false;
        }
        
        if (!phone) {
            alert('请输入联系电话');
            document.getElementById('phone').focus();
            return false;
        }
        
        if (!/^[0-9]{11}$/.test(phone)) {
            alert('请输入正确的 11 位手机号码');
            document.getElementById('phone').focus();
            return false;
        }
    }
    
    if (step === 2 && !state.selectedPlan) {
        alert('请选择一个套餐');
        return false;
    }
    
    if (step === 3 && !state.selectedNumber) {
        alert('请选择一个手机号码');
        return false;
    }
    
    return true;
}

// 填充摘要信息
function fillSummary() {
    document.getElementById('summaryName').textContent = state.formData.fullName || '-';
    document.getElementById('summaryPhone').textContent = state.formData.phone || '-';
    document.getElementById('summaryPlan').textContent = state.selectedPlan ? plans[state.selectedPlan].name : '-';
    document.getElementById('summaryNumber').textContent = state.selectedNumber || '-';
    document.getElementById('summaryPrice').textContent = state.selectedPlan ? `¥${plans[state.selectedPlan].price}/月` : '-';
}

// 设置表单验证
function setupFormValidation() {
    const form = document.getElementById('signupForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 验证条款
        const terms = document.getElementById('terms');
        if (!terms.checked) {
            alert('请阅读并同意服务条款和隐私政策');
            return;
        }
        
        // 提交成功
        submitForm();
    });
}

// 提交表单
function submitForm() {
    // 生成申请编号
    const referenceNumber = 'APP' + Date.now().toString().slice(-8);
    document.getElementById('referenceNumber').textContent = referenceNumber;
    
    // 显示成功模态框
    document.getElementById('successModal').classList.add('show');
    
    // 这里可以添加实际的表单提交逻辑
    console.log('表单数据:', {
        ...state.formData,
        plan: state.selectedPlan,
        number: state.selectedNumber
    });
}

// 关闭模态框
function closeModal() {
    document.getElementById('successModal').classList.remove('show');
    
    // 重置表单
    document.getElementById('signupForm').reset();
    state.currentStep = 1;
    state.selectedPlan = null;
    state.selectedNumber = null;
    state.formData = {};
    
    // 重置 UI
    document.querySelectorAll('.form-step').forEach((step, index) => {
        step.style.display = index === 0 ? 'block' : 'none';
    });
    
    document.querySelectorAll('.plan-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    document.querySelectorAll('.number-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    document.getElementById('planNextBtn').disabled = true;
    document.getElementById('numberNextBtn').disabled = true;
    
    updateProgressIndicator();
    initNumberGrid();
}

// 实时验证输入
document.addEventListener('DOMContentLoaded', function() {
    // 身份证号码验证
    const idNumberInput = document.getElementById('idNumber');
    idNumberInput.addEventListener('blur', function() {
        const value = this.value.trim();
        if (value && document.getElementById('idType').value === 'idcard') {
            if (!/^\d{17}[\dXx]$/.test(value)) {
                this.setCustomValidity('请输入正确的身份证号码');
            } else {
                this.setCustomValidity('');
            }
        }
    });
    
    // 手机号验证
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length > 11) {
            this.value = this.value.slice(0, 11);
        }
    });
});
