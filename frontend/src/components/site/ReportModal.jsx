import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { 
  X, 
  Link2Off, 
  MessageSquareWarning, 
  ImageOff, 
  LayoutGrid, 
  ShieldAlert, 
  AlertTriangle, 
  AlertOctagon,
  MessageCircleQuestion,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'

const REPORT_REASONS = [
  { 
    id: 'broken_link', 
    icon: Link2Off, 
    defaultLabel: 'Broken or incorrect link', 
    color: 'text-orange-600',
    description: "In order to adequately address the reported broken or incorrect link, please provide specific details outlining the anomaly. This should include the precise location of the defective hyperlink, the anticipated destination, and any resulting error messages. Comprehensive information facilitates a swift technical resolution."
  },
  { 
    id: 'outdated_review', 
    icon: MessageSquareWarning, 
    defaultLabel: 'Outdated or inaccurate review', 
    color: 'text-yellow-600',
    description: "To contest an outdated or factually inaccurate review, please clearly specify the discrepancies in the field below. Providing concrete details or referencing current operational data will significantly assist our editorial team in verifying the inaccuracies and promptly amending the review."
  },
  { 
    id: 'outdated_screenshot', 
    icon: ImageOff, 
    defaultLabel: 'Outdated or inaccurate screenshot', 
    color: 'text-orange-500',
    description: "If you are reporting an outdated or misrepresentative screenshot, please detail the specific visual inconsistencies observed. Your explicit description of the current site layout versus our displayed assets is vital for maintaining the visual accuracy of our platform."
  },
  { 
    id: 'inaccurate_category', 
    icon: LayoutGrid, 
    defaultLabel: 'Inaccurate categorization', 
    color: 'text-amber-500',
    description: "To report an erroneous categorization, please articulate the reasons the current classification is inaccurate and suggest a more appropriate taxonomy. Proper categorization is crucial for user navigation, and we value your input in rectifying organizational discrepancies."
  },
  { 
    id: 'spam', 
    icon: ShieldAlert, 
    defaultLabel: 'Spam or malicious content', 
    color: 'text-red-500',
    description: "If you have encountered content that exhibits characteristics of spam, deceptive practices, or malicious software, please document the exact nature and location of the risk. Mitigating fraudulent or harmful material is an absolute priority for ensuring user safety."
  },
  { 
    id: 'exploitation', 
    icon: AlertTriangle, 
    defaultLabel: 'Website shows exploitation and abuse of people under 18', 
    color: 'text-orange-500',
    description: "Reports alleging the exploitation or abuse of minors are addressed with the highest level of urgency and severity. Please provide any relevant URLs or accompanying context, understanding that UPX enforces a strict zero-tolerance policy and complies with all legal reporting obligations regarding such offenses."
  },
  { 
    id: 'explicit', 
    icon: AlertOctagon, 
    defaultLabel: 'Nonconsensual explicit content distribution (revenge porn)', 
    color: 'text-red-600',
    description: "Should you identify instances of nonconsensual explicit content distribution, please furnish the necessary details to substantiate the unauthorized posting. UPX is resolutely committed to protecting individual privacy rights and facilitating the immediate review of nonconsensual media."
  },
  { 
    id: 'general', 
    icon: MessageCircleQuestion, 
    defaultLabel: 'General feedback or suggestions', 
    color: 'text-stone-600',
    description: "For any general inquiries, structural feedback, or procedural suggestions concerning the UPX platform, please elaborate in the text box below. Continuous improvement relies heavily on constructive external insights, and your observations will be thoroughly reviewed."
  },
]

const ReportModal = ({ isOpen, onClose, site }) => {
  const modalRef = useRef(null)
  const [selectedReason, setSelectedReason] = useState(null)
  const [formData, setFormData] = useState({
    details: '',
    name: '',
    email: '',
    confirm: false
  })
  const [formErrors, setFormErrors] = useState({})

  const tTitle = "Report a Review Feedback for"
  const tSubtitle = "What's the issue?"

  const selectedReasonLabel = selectedReason ? selectedReason.defaultLabel : ""

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = "hidden"
    } else {
      setSelectedReason(null)
      setFormData({ details: '', name: '', email: '', confirm: false })
      setFormErrors({})
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen || !site) return null

  const handleClose = () => {
    onClose()
  }

  const handleSelectReason = (reason) => {
    setSelectedReason(reason)
    setFormErrors({})
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: false }))
    }
  }

  const handleSubmit = () => {
    const errors = {}
    if (!formData.details.trim()) errors.details = true
    if (!formData.name.trim()) errors.name = true
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = true
    if (!formData.confirm) errors.confirm = true

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    // Submit logic placeholder
    console.log("Submit logic with data:", { reason: selectedReason.id, ...formData })
    handleClose()
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 opacity-100 transition-opacity">
      <div 
        ref={modalRef}
        className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-slideUp sm:animate-fadeIn"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 gap-2 shrink-0">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {selectedReason ? (
              <selectedReason.icon className={`w-8 h-8 shrink-0 ${selectedReason.color}`} />
            ) : (
              site.favicon ? (
                <img
                  src={`/storage/${site.favicon}`}
                  alt="Favicon"
                  className="w-8 h-8 object-contain rounded-md shrink-0"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 font-bold text-xs shrink-0">
                  ?
                </div>
              )
            )}
            <h2 className="text-xl sm:text-2xl font-bold text-black leading-tight break-words">
              {tTitle} {site.name}
            </h2>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-black bg-transparent hover:bg-gray-100 rounded-full transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        {selectedReason ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 hide-scrollbar text-black text-[15px] leading-relaxed">
            <p className="mb-6 h-[70px] sm:h-auto overflow-y-auto hide-scrollbar">
              {selectedReason.description}
            </p>

            <div className="bg-gray-50 p-5 rounded-xl mb-6 text-[14px] text-gray-800 border border-gray-100">
              <p className="mb-4">
                If you wish to report any issues regarding the content found on <span className="font-semibold">{site.name}</span>, please reach out directly to the site owner. UPX is solely responsible for providing website reviews and cannot address concerns about specific content.
              </p>
              <p>
                Disclaimer: The reviews and classifications on UPX are provided for informational purposes only. UPX operates as an independent review aggregator and directory; we do not host, produce, or control the content found on the external websites we evaluate.
              </p>
            </div>

            <div className="mb-5">
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                className={`w-full border ${formErrors.details ? 'border-red-500' : 'border-gray-300'} rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#D80032] focus:border-transparent min-h-[140px] max-h-[300px] resize-y bg-white text-black placeholder:text-gray-400`}
                placeholder="Please enter details of your request"
              ></textarea>
              {formErrors.details && <p className="text-[#D80032] text-sm mt-1">Please provide details.</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#D80032] focus:border-transparent bg-white text-black placeholder:text-gray-400`}
                  placeholder="Your Name"
                />
                {formErrors.name && <p className="text-[#D80032] text-sm mt-1">Name is required.</p>}
              </div>
              <div>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#D80032] focus:border-transparent bg-white text-black placeholder:text-gray-400`}
                  placeholder="Your Email"
                />
                {formErrors.email && <p className="text-[#D80032] text-sm mt-1">Valid email is required.</p>}
              </div>
            </div>

            <label className="flex items-start gap-4 cursor-pointer mb-2 group">
              <input 
                type="checkbox" 
                name="confirm"
                checked={formData.confirm}
                onChange={handleInputChange}
                className={`mt-1 w-[22px] h-[22px] shrink-0 rounded border-gray-300 bg-white text-[#D80032] focus:ring-[#D80032] accent-[#D80032] cursor-pointer ${formErrors.confirm ? 'ring-2 ring-red-500 border-red-500' : ''}`}
                style={{ colorScheme: "light" }}
              />
              <span className={`font-semibold ${formErrors.confirm ? 'text-[#D80032]' : 'text-black'} leading-snug mt-1 group-hover:text-gray-800 transition-colors`}>
                I am submitting feedback for a {site.name} website review
              </span>
            </label>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-2 sm:p-4 hide-scrollbar">
            <div className="px-4 py-2 mb-2">
              <p className="text-gray-400 text-[15px] font-medium">{tSubtitle}</p>
            </div>
            
            <div className="flex flex-col gap-1 pb-4">
              {REPORT_REASONS.map((reason) => {
                const IconItem = reason.icon;
                return (
                  <ReportReasonItem 
                    key={reason.id}
                    reason={reason}
                    icon={<IconItem className={`w-6 h-6 ${reason.color}`} />}
                    onSelect={() => handleSelectReason(reason)}
                  />
                )
              })}
            </div>
          </div>
        )}

        {/* Form Footer */}
        {selectedReason && (
          <div className="border-t border-gray-100 flex items-center justify-between p-4 sm:px-6 sm:py-5 shrink-0 bg-white">
            <button
              onClick={() => setSelectedReason(null)}
              className="flex items-center justify-center gap-2 text-gray-400 font-semibold px-6 py-3 hover:bg-gray-100 hover:text-black rounded-xl transition-colors bg-gray-100 bg-opacity-50"
            >
              <ArrowLeft className="w-5 h-5 shrink-0" />
              Back
            </button>
            <button
              className="bg-[#D80032] hover:bg-[#b50029] text-white font-semibold px-10 py-3 rounded-xl transition-colors"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

const ReportReasonItem = ({ reason, icon, onSelect }) => {
  const label = reason.defaultLabel
  
  return (
    <button
      onClick={onSelect}
      className="w-full flex items-center gap-4 px-4 py-3.5 sm:py-4 bg-transparent hover:bg-gray-50 text-black hover:text-black text-left transition-colors rounded-2xl group"
    >
      <div className="shrink-0">
        {icon}
      </div>
      <span className="flex-1 text-[15px] sm:text-base font-semibold text-gray-900 group-hover:text-black">
        {label}
      </span>
      <ArrowRight className="w-5 h-5 text-gray-400 shrink-0 group-hover:text-black transition-colors" />
    </button>
  )
}

export default ReportModal
