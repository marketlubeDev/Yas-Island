import React from "react";

export default function PersonalDetailsForm({ formData, setFormData }) {
  return (
    <div className="payment-form__left">
      <div className="form-group-row">
        <div className="form-group">
          <label className="form-group__label">FIRST NAME *</label>
          <input
            type="text"
            className="form-group__input"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label className="form-group__label">LAST NAME *</label>
          <input
            type="text"
            className="form-group__input"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </div>
      </div>

      <div className="form-group-row">
        <div className="form-group">
          <label className="form-group__label">COUNTRY OF RESIDENCE *</label>
          <select
            className="form-group__select"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          >
            <option value="UAE">UAE</option>
            {/* Add more countries as needed */}
          </select>
        </div>

        <div className="form-group">
          <label className="form-group__label">NATIONALITY *</label>
          <select
            className="form-group__select"
            value={formData.nationality}
            onChange={(e) =>
              setFormData({ ...formData, nationality: e.target.value })
            }
          >
            <option value="UAE">UAE</option>
            {/* Add more nationalities as needed */}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-group__label">
          PHONE NUMBER (PREFERRED NUMBER) *
        </label>
        <div className="form-group__phone">
          <select
            className="form-group__phone-code"
            value={formData.phoneCode}
            onChange={(e) =>
              setFormData({ ...formData, phoneCode: e.target.value })
            }
          >
            <option value="+971">+971</option>
            {/* Add more country codes as needed */}
          </select>
          <input
            type="text"
            className="form-group__phone-number"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}
